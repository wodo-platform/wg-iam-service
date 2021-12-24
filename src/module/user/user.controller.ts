import { Demo } from '.prisma/client';
import { Get, Post, Body, Put, Delete, Param, Query, Controller, HttpCode,ParseIntPipe, ParseBoolPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { UserService } from 'src/module/user/user.service';



@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class DemoController {
  
  constructor(private readonly demoService: UserService) {}

  @ApiOperation({ summary: 'Find all demos' })
  @ApiResponse({ status: 200, description: 'Return all demos.'})
  @Get('')
  async findAll(): Promise<[]> {
    return [];
  }

}