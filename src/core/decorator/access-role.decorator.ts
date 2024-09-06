import { SetMetadata } from '@nestjs/common'
import { ACCESS_ROLE } from '../enum/access-role'

export const ACCESS_ROLES_KEY = 'roles'

export const AccessRoles = (...roles: ACCESS_ROLE[]) => SetMetadata(ACCESS_ROLES_KEY, roles)
