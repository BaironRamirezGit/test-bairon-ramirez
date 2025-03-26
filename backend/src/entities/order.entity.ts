import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn , JoinColumn} from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @Column()
  @ApiProperty({ description: 'Id del usuario', example: 1 })
  id_user: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'id_product' })
  product: Product;

  @Column()
  @ApiProperty({ description: 'Id del producto', example: 1 })
  id_product: number;

  @Column({ default: 'pendiente' })
  status: string;

  @Column()
  @ApiProperty({ description: 'Cantidad del producto', example: 1 })
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;
}
