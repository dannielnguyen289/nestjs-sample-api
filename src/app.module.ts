import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { AuthorizationGuard } from './core/security/authorization.guard'
import { IndexModule } from './module/index/index.module'
import { ConfigModule } from './core/config/config.module'
import { UtilModule } from './core/util/util.module'
import { AuthModule } from './module/auth/auth.module'
import { ManagerModule } from './core/manager/manager.module'
import { HeaderMiddleware } from './core/middleware/header.middleware'
import { OwnerModule } from './module/owner/owner.module'
import { MasterModule } from './module/master/master.module'
import { UserModule } from './module/user/user.module'

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard
    }
  ],
  imports: [ConfigModule, UtilModule, ManagerModule, IndexModule, AuthModule, MasterModule, OwnerModule, UserModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HeaderMiddleware).exclude('health-check').forRoutes('/')
  }
}
