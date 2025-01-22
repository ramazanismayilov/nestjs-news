import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { AuthGuard } from "src/guards/auth.guard";

@Controller('category')
export class CategoryController{
    constructor(private categoryService: CategoryService){}

    @Get()
    list(){
        return this.categoryService.list()
    }

    @Post()
    @UseGuards(AuthGuard)
    create(){
        return this.categoryService.create()
    }
}