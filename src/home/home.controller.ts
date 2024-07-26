import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('')
@ApiTags('home')
export class HomeController {

    @Get('/')
    @ApiOperation({ summary: 'Get Home Page' })
    index() {
        return 'Home Page'
    }
}
