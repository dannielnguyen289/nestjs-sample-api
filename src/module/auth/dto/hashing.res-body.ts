import { ApiProperty } from '@nestjs/swagger'

export class HashingResBody {
  @ApiProperty({ format: 'uuid' })
  uuid: string

  @ApiProperty({ format: 'hashing' })
  hashing: string
}
