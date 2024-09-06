import { Observable } from 'rxjs'
import { Request } from 'express'
import { Reflector } from '@nestjs/core'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { ACCESS_ROLE } from '../enum/access-role'
import { ACCESS_ROLES_KEY } from '../decorator/access-role.decorator'

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // Get require roles
    const requiredRoles = this.reflector.getAllAndOverride<ACCESS_ROLE[]>(ACCESS_ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    // No required roles
    if (!requiredRoles) {
      return true
    }

    // Anonymous
    if (requiredRoles.includes(ACCESS_ROLE.ANONYMOUS)) {
      return true
    }

    // Request
    const request = context.switchToHttp().getRequest<Request>()

    // Check CID
    const cid = request.get('cid')

    // Check authorization
    if (!cid) {
      return false
    }

    // Everyone
    if (requiredRoles.includes(ACCESS_ROLE.EVERYONE)) {
      return true
    }

    // Extract access roles
    const headerRoles = request.get('roles')
    const accessRoles = headerRoles ? headerRoles.split(';') : []

    // Check required roles
    for (const key of requiredRoles) {
      if (key.includes('*') || accessRoles.includes(key)) {
        return true
      }
    }

    return false
  }
}
