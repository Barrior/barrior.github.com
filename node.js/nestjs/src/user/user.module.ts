import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  // providers: [AppService],
})
export class UserModule {}
