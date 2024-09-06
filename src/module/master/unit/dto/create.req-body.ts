import { IsNotEmpty, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateReqBody {
  @IsNotEmpty()
  @MaxLength(250)
  @ApiProperty({ maxLength: 250 })
  name: string
}
