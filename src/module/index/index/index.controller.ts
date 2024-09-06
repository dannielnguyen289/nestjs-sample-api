import { ApiTags } from '@nestjs/swagger'
import { Controller, Get } from '@nestjs/common'
import { ACCESS_ROLE } from '../../../core/enum/access-role'
import { AccessRoles } from '../../../core/decorator/access-role.decorator'
import { IndexRes } from './type'

@ApiTags('index')
@Controller('/')
@AccessRoles(ACCESS_ROLE.ANONYMOUS)
export class IndexController {
  @Get()
  getHello(): IndexRes {
    return {
      statusCode: 200,
      message: 'The services is working well...',
      datetime: new Date()
    }
  }
}
