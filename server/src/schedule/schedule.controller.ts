import { Controller, Get, Request } from '@nestjs/common';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  findAll(@Request() req) {
    return this.scheduleService.findAll(+req.user.id);
  }
}
