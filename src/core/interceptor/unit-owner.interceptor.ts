import * as fs from 'fs'
import { Observable } from 'rxjs'
import { Request } from 'express'
import { CallHandler, ExecutionContext, ForbiddenException, Injectable, NestInterceptor } from '@nestjs/common'

@Injectable()
export class UnitOwnerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest()
    const { cid } = request.headers
    const { id } = request.params

    const rawData = fs.readFileSync('./data/user.json', 'utf-8')
    const data = JSON.parse(rawData)

    const user = data.find(x => x.cid === cid)
    if (!user || !user.granted_unit.includes(id)) {
      throw new ForbiddenException(`You are not granted access to the unit [${id}].`)
    }

    return next.handle()
  }
}
