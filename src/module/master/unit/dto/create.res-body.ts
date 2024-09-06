import { UNIT_STATUS } from '../../../../core/enum/unit-status'
import { ApiProperty } from '@nestjs/swagger'

export class CreateResBody {
  @ApiProperty({ format: 'uuid' })
  id: string

  @ApiProperty({ maxLength: 250 })
  name: string

  @ApiProperty({ enum: UNIT_STATUS })
  status: UNIT_STATUS
}
