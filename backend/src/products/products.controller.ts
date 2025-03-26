import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards, ParseIntPipe } from "@nestjs/common";
import { ProductService } from "./products.service";
import { AuthGuard } from "../auth/jwt.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { CreateProductDto, UpdateProductDto } from "./dto/product.dto";

@Controller("products")
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin")
  createProduct(@Body() data: CreateProductDto) {
    return this.productService.createProduct(data);
  }

  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get(":id")
  getProductById(@Param("id", ParseIntPipe) id: number) {
    return this.productService.getProductById(id);
  }

  @Put(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin")
  updateProduct(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateProductDto) {
    return this.productService.updateProduct(id, data);
  }

  @Delete(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin")
  deleteProduct(@Param("id", ParseIntPipe) id: number) {
    return this.productService.deleteProduct(id);
  }
}
