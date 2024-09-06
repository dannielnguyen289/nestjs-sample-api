import { Injectable, NestMiddleware } from '@nestjs/common'
import { JwtManager } from '../manager/jwt.manager'

@Injectable()
export class HeaderMiddleware implements NestMiddleware {
  constructor(private jwtManager: JwtManager) {}

  async use(req: any, res: any, next: () => void) {
    // Get bear token
    const bearToken = req.get('authorization')

    // Decode JWT token
    const payload = await this.jwtManager.decode(bearToken ? bearToken.replace('Bearer ', '') : '')

    // Assign data to headers
    if (payload) {
      req.headers.cid = payload.cid
      req.headers.roles = payload.roles
    }

    // Next
    next()
  }
}
