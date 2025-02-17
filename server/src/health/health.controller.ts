import { Controller, Get } from '@nestjs/common';
const memoryUsage = process.memoryUsage();

@Controller('health')
export class HealthController {
  @Get()
  getHealth() {
    const now = new Date();
    return {
      status: 'ok',
      timestamp: now.toISOString(),
      message: 'Server is running smoothly',
      uptimeSeconds: process.uptime(),
      memory: {
        rss: memoryUsage.rss,
        heapUsed: memoryUsage.heapUsed,
        external: memoryUsage.external
      }
    };
  }
}
