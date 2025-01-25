import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { AuthGuard } from "src/guards/auth.guard";
import { ApiBearerAuth } from "@nestjs/swagger";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) { }

    @Get()
    list() {
        return this.categoryService.list()
    }

    @Post()
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    create(@Body() body: CreateCategoryDto) {
        return this.categoryService.create(body)
    }

    @Post(':id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    update(@Body() body: UpdateCategoryDto, @Param('id') id: number) {
        return this.categoryService.update(id, body)
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    delete(@Param('id') id: number) {
        return this.categoryService.delete(id)
    }

}