import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface HappyHourConfig {
  startTime: string;
  endTime: string;
  discount: number;
  daysOfWeek: number[];
  isActive: boolean;
}

@Injectable()
export class HappyHourService {
  constructor(private prisma: PrismaService) {}

  async getConfig(): Promise<HappyHourConfig | null> {
    const config = await this.prisma.happyHour.findFirst();
    if (!config) return null;
    return {
      ...config,
      daysOfWeek: JSON.parse(config.daysOfWeek),
    };
  }

  async getStatus() {
    const config = await this.getConfig();
    if (!config || !config.isActive) {
      return { active: false, discount: 0, message: 'Happy Hour no configurado' };
    }
    const now = new Date();
    const day = now.getDay();
    if (!config.daysOfWeek.includes(day)) {
      return { active: false, discount: 0, message: 'No es día de Happy Hour' };
    }
    const [sh, sm] = config.startTime.split(':').map(Number);
    const [eh, em] = config.endTime.split(':').map(Number);
    const nowMin = now.getHours() * 60 + now.getMinutes();
    const startMin = sh * 60 + sm;
    const endMin = eh * 60 + em;
    const active = nowMin >= startMin && nowMin < endMin;
    return {
      active,
      discount: active ? config.discount : 0,
      startTime: config.startTime,
      endTime: config.endTime,
      message: active
        ? `Happy Hour activo — ${config.discount}% off hasta las ${config.endTime}hs`
        : `Happy Hour empieza a las ${config.startTime}hs`,
    };
  }

  async update(data: Partial<HappyHourConfig>) {
    const existing = await this.prisma.happyHour.findFirst();
    const updateData = {
      ...data,
      daysOfWeek: data.daysOfWeek ? JSON.stringify(data.daysOfWeek) : undefined,
    };
    if (existing) {
      return this.prisma.happyHour.update({ where: { id: existing.id }, data: updateData });
    }
    return this.prisma.happyHour.create({
      data: {
        startTime: data.startTime || '18:00',
        endTime: data.endTime || '20:00',
        discount: data.discount || 20,
        daysOfWeek: JSON.stringify(data.daysOfWeek || [1,2,3,4,5]),
        isActive: data.isActive ?? true,
      },
    });
  }
}
