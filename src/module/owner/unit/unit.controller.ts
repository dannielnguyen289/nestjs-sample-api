import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Get, HttpCode, Param, Patch, UseInterceptors } from '@nestjs/common'
import { UnitOwnerInterceptor } from '../../../core/interceptor/unit-owner.interceptor'
import { AccessRoles } from '../../../core/decorator/access-role.decorator'
import { ACCESS_ROLE } from '../../../core/enum/access-role'
import { UnitService } from './unit.service'
import { DetailResBody } from './dto/detail.res-body'
import { ItemReqParam } from './dto/item.req-param'
import { UpdateReqBody } from './dto/update.req-body'

@ApiTags('owner')
@AccessRoles(ACCESS_ROLE.OWNER)
@Controller('/owner/unit')
export class UnitController {
  constructor(private unitService: UnitService) {}

  @Get(':id')
  @UseInterceptors(UnitOwnerInterceptor)
  @ApiResponse({ type: DetailResBody })
  detail(@Param() param: ItemReqParam): DetailResBody {
    return this.unitService.detail(param.id)
  }

  @Patch(':id')
  @HttpCode(204)
  @UseInterceptors(UnitOwnerInterceptor)
  @ApiResponse({ status: 204, description: 'updated - no body' })
  update(@Param() param: ItemReqParam, @Body() body: UpdateReqBody) {
    return this.unitService.update(param.id, body)
  }
}
