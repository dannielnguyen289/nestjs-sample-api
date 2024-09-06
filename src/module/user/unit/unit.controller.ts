import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { Controller, Get, Param } from '@nestjs/common'
import { AccessRoles } from '../../../core/decorator/access-role.decorator'
import { ACCESS_ROLE } from '../../../core/enum/access-role'
import { UnitService } from './unit.service'
import { ItemReqParam } from './dto/item.req-param'
import { DetailResBody } from './dto/detail.res-body'

@ApiTags('user')
@AccessRoles(ACCESS_ROLE.ANONYMOUS)
@Controller('unit')
export class UnitController {
  constructor(private unitService: UnitService) {}

  @Get(':id')
  @ApiResponse({ type: DetailResBody })
  index(@Param() param: ItemReqParam): DetailResBody {
    return this.unitService.find(param.id)
  }
}
