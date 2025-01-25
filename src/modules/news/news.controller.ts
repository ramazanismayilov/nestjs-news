import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { NewsService } from "./news.service";
import { AuthGuard } from "src/guards/auth.guard";
import { CreateNewsDto } from "./dto/create-news.dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { UpdateNewsDto } from "./dto/update-news.dto";

@Controller('news')
export class NewsController {
    constructor(private newsService: NewsService) { }

    @Get()
    list() {
        return this.newsService.list()
    }

    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    create(@Body() body: CreateNewsDto) {
        return this.newsService.create(body)
    }

    @Post(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    update(@Param('id') id: number, @Body() body: UpdateNewsDto) {
        return this.newsService.update(id, body)
    }
}