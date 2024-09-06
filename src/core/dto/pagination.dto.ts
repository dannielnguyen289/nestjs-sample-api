import { ApiProperty } from '@nestjs/swagger'
import { Pagination } from '../interface/pagination.interface'

export class PaginationDto implements Pagination {
  @ApiProperty({ type: Number, minimum: 1 })
  pageNo: number

  @ApiProperty({ type: Number, minimum: 1, maximum: 100 })
  pageSize: number

  @ApiProperty({ type: Number, minimum: 0 })
  totalItems: number

  @ApiProperty({ type: Number, minimum: 0 })
  totalPages: number
}
