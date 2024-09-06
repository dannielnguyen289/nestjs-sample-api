import { ApiProperty } from '@nestjs/swagger'

export class SigninResBody {
  @ApiProperty({ format: 'uuid' })
  cid: string

  @ApiProperty()
  username: string

  @ApiProperty()
  displayName: string

  @ApiProperty({ format: 'email' })
  email: string

  @ApiProperty()
  roles: string[]

  @ApiProperty({ format: 'JWT' })
  token: string

  @ApiProperty({ format: 'JWT' })
  refreshToken: string
}
