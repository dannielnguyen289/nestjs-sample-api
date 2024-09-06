import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query } from '@nestjs/common'
import { ACCESS_ROLE } from '../../../core/enum/access-role'
import { AccessRoles } from '../../../core/decorator/access-role.decorator'
import { UnitService } from './unit.service'
import { ListResBody } from './dto/list.res-body'
import { ListReqQuery } from './dto/list.req-query'
import { CreateReqBody } from './dto/create.req-body'
import { CreateResBody } from './dto/create.res-body'
import { DetailResBody } from './dto/detail.res-body'
import { UpdateReqBody } from './dto/update.req-body'
import { ItemReqParam } from './dto/item.req-param'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('master')
@AccessRoles(ACCESS_ROLE.MASTER)
@Controller('/master/unit')
export class UnitController {
  constructor(private unitService: UnitService) {}

  @Get()
  @ApiResponse({ type: ListResBody })
  list(@Query() query: ListReqQuery): ListResBody {
    return this.unitService.list(query)
  }

  @Post()
  @ApiResponse({ type: CreateResBody })
  create(@Body() body: CreateReqBody): CreateResBody {
    return this.unitService.create(body)
  }

  @Get(':id')
  @ApiResponse({ type: DetailResBody })
  detail(@Param() param: ItemReqParam): DetailResBody {
    return this.unitService.detail(param.id)
  }

  @Patch(':id')
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'updated - no body' })
  update(@Param() param: ItemReqParam, @Body() body: UpdateReqBody) {
    return this.unitService.update(param.id, body)
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'deleted - no body' })
  remove(@Param() param: ItemReqParam) {
    return this.unitService.remove(param.id)
  }
}
