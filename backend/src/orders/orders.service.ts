import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
  ) {}

  // Crear una orden (Solo Clientes)
  async create(orderData: Partial<Order>, user: User) {
    const newOrder = this.ordersRepository.create({
      ...orderData,
      id_user: user.id,
      status: 'pendiente',
    });
    return await this.ordersRepository.save(newOrder);
  }

  // Listar órdenes (Clientes ven las suyas, Admin ve todas)
  async findAll(user: User) {
    if (user.role === 'admin') {
      return await this.ordersRepository.find();
    }
    return await this.ordersRepository.find({ where: { id_user: user.id } });
  }

  // Obtener una orden por ID
  async findOne(id: number) {
    const order = await this.ordersRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException('Orden no encontrada');
    }
    return order;
  }
}
