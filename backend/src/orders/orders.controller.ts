import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { User } from '../auth/user.decorator';
import { Order } from '../entities/order.entity';

@Controller('orders')
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('client')
  create(@Body() orderData: Partial<Order>, @User() user) {
    return this.ordersService.create(orderData, user);
  }

  @Get()
  findAll(@User() user) {
    return this.ordersService.findAll(user);
  }

  // Obtener detalles de una orden específica
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(parseInt(id));
  }
}
