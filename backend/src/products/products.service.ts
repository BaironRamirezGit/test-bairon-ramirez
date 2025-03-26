import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../entities/product.entity";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  async createProduct(data: { name: string; price: number; description?: string }) {
    const newProduct = this.productRepository.create(data);
    return this.productRepository.save(newProduct);
  }

  async getAllProducts() {
    return this.productRepository.find();
  }

  async getProductById(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException("Producto no encontrado");
    return product;
  }

  async updateProduct(id: number, data: Partial<Product>) {
    const product = await this.getProductById(id);
    Object.assign(product, data);
    return this.productRepository.save(product);
  }

  async deleteProduct(id: number) {
    const product = await this.getProductById(id);
    return this.productRepository.remove(product);
  }
}
