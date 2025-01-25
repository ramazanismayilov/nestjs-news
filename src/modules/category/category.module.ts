import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "src/entities/Category.entity";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([CategoryEntity])],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: [CategoryService]
})
export class CategoryModule { }