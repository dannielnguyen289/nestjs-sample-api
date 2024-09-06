import { IsIn, IsOptional, Max, MaxLength, Min } from 'class-validator'
import { Type } from 'class-transformer'
import { UNIT_STATUS } from '../../../../core/enum/unit-status'
import { ApiProperty } from '@nestjs/swagger'

export class ListReqQuery {
  @IsOptional()
  @MaxLength(250)
  @ApiProperty({ required: false, maxLength: 250 })
  text: string

  @IsOptional()
  @IsIn([UNIT_STATUS.READY, UNIT_STATUS.ACTIVE, UNIT_STATUS.LOCKED, UNIT_STATUS.CLOSED])
  @ApiProperty({ required: false, enum: UNIT_STATUS })
  status: string

  @IsOptional()
  @Min(1)
  @Type(() => Number)
  @ApiProperty({ required: false, default: 1, minimum: 1 })
  pageNo: number = 1

  @IsOptional()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  @ApiProperty({ required: false, default: 10, minimum: 1, maximum: 100 })
  pageSize: number = 10
}
