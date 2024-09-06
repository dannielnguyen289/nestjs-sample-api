import * as fs from 'fs'
import { Injectable } from '@nestjs/common'
import { JwtManager } from '../../core/manager/jwt.manager'
import { JwtPayload } from '../../core/interface/jwt-payload.interface'
import { BusinessException } from '../../core/exception/business.exception'
import { HashingReqBody } from './dto/hashing.req-body'
import { HashingResBody } from './dto/hashing.res-body'
import { HashingManager } from '../../core/manager/hashing.manager'
import { SigninReqBody } from './dto/signin.req-body'
import { SigninResBody } from './dto/signin.res-body'

@Injectable()
export class AuthService {
  constructor(
    private hashingManager: HashingManager,
    private jwtManager: JwtManager
  ) {}

  /**
   * Hashing sample password
   *
   * @param params
   */
  // async hashing(params: HashingReqBody): Promise<HashingResBody> {
  //   const res = new HashingResBody()
  //
  //   res.hashing = await this.hashingManager.hash(params.password)
  //
  //   return res
  // }

  /**
   * Sign in for access token
   *
   * @param params
   */
  async signin(params: SigninReqBody): Promise<SigninResBody> {
    const rawData = fs.readFileSync('./data/user.json', 'utf-8')
    const data = JSON.parse(rawData)

    // Find and check existence for user by username
    const user = data.find(x => x.username === params.username)
    if (!user) {
      throw new BusinessException(1, `Username or password is incorrect.`, { ...params })
    }

    // Check the password
    const isCorrectPassword = await this.hashingManager.compare(params.password, user.password)
    if (!isCorrectPassword) {
      throw new BusinessException(1, `Username or password is incorrect.`, { ...params })
    }

    // Make access token
    const payload: JwtPayload = {
      cid: user.cid,
      username: user.username,
      roles: user.roles ? user.roles.join(';') : ''
    }

    // Encrypt JWT
    const token = await this.jwtManager.signToken(payload)
    const refreshToken = await this.jwtManager.signRefreshToken(payload)

    // Make response
    const res = new SigninResBody()
    res.cid = user.cid
    res.username = user.username
    res.displayName = user.displayName
    res.email = user.email
    res.roles = user.roles

    res.token = token
    res.refreshToken = refreshToken

    return res
  }
}
