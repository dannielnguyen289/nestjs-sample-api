import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Post } from '@nestjs/common'
import { HashingReqBody } from './dto/hashing.req-body'
import { HashingResBody } from './dto/hashing.res-body'
import { AuthService } from './auth.service'
import { SigninReqBody } from './dto/signin.req-body'
import { SigninResBody } from './dto/signin.res-body'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Hashing dummy password
   *
   * @param body
   */
  // @Post('hashing')
  // @ApiResponse({ type: HashingResBody })
  // async hashing(@Body() body: HashingReqBody): Promise<HashingResBody> {
  //   return await this.authService.hashing(body)
  // }

  /**
   * Sing-in for instance new access token
   *
   * @param body
   */
  @Post('signin')
  @ApiResponse({ type: HashingResBody })
  async signin(@Body() body: SigninReqBody): Promise<SigninResBody> {
    return await this.authService.signin(body)
  }
}
