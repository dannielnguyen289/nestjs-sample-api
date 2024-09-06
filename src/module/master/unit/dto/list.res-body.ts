import { ApiProperty } from '@nestjs/swagger'
import { UNIT_STATUS } from '../../../../core/enum/unit-status'
import { PaginationDto } from '../../../../core/dto/pagination.dto'

export class ListItem {
  @ApiProperty({ format: 'uuid' })
  id: string

  @ApiProperty({ maxLength: 250 })
  name: string

  @ApiProperty({ enum: UNIT_STATUS })
  status: UNIT_STATUS
}

export class ListResBody {
  @ApiProperty({ type: [ListItem] })
  list: ListItem[]

  @ApiProperty({ type: PaginationDto })
  pagination: PaginationDto
}
