import { Controller, Get } from '@nestjs/common';

@Controller('cat')
export class IndexController {
  @Get('find_all')
  create(): object[] {
    return [
      { name: 'kitty_one', age: 2 },
      { name: 'kitty_two', age: 1 },
    ]
  }
}
