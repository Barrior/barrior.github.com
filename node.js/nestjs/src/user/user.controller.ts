import { Controller, Get, Post, Put } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Post()
  create(): object {
    return {
      userName: 'Barrior',
      role: 'admin',
    }
  }

  @Get()
  index(): string {
    return 'hello I am Barrior'
  }

  @Put()
  update(): string {
    return 'updated'
  }

  @Post('login')
  login(): object {
    return {
      userName: 'Barrior',
      role: 'admin',
    }
  }

  @Get('logout')
  logout(): object {
    return {
      userName: 'Barrior',
      role: 'admin',
    }
  }
}
