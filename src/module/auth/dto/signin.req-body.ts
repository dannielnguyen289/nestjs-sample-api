import { IsNotEmpty, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class SigninReqBody {
  @IsNotEmpty()
  @MaxLength(250)
  @ApiProperty({ maxLength: 250 })
  username: string

  @IsNotEmpty()
  @MaxLength(250)
  @ApiProperty({ maxLength: 250 })
  password: string
}
