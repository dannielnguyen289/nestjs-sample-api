import { IsNotEmpty, IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ItemReqParam {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ format: 'UUID' })
  id: string
}
