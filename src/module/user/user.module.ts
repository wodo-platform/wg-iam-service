import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaService } from '../../service/prisma.service';
import { UserService } from './user.service';
import { DemoController } from './user.controller';

@Module({
  imports: [ 
  ],
  providers: [
    PrismaService,
    UserService
  ],
  controllers: [
    DemoController
  ],
  exports: [UserService]
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
  }
}