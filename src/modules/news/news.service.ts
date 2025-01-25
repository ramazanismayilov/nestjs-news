import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NewsEntity } from "src/entities/News.entity";
import { Repository } from "typeorm";
import { CreateNewsDto } from "./dto/create-news.dto";
import { CategoryService } from "../category/category.service";
import { UpdateNewsDto } from "./dto/update-news.dto";

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(NewsEntity)
        private newsRepo: Repository<NewsEntity>,
        private categoryService: CategoryService
    ) { }

    list() {
        return this.newsRepo.find()
    }

    async create(params: CreateNewsDto) {
        let category = await this.categoryService.findById(params.categoryId)
        if (!category) throw new NotFoundException("Category is not found")

        let newsItem = this.newsRepo.create(params)
        await newsItem.save()

        return {
            message: "News created successfully",
            newsItem
        }
    }

    async update(id: number, params: UpdateNewsDto) {
        let news = await this.newsRepo.findOne({ where: { id } })
        if (!news) throw new NotFoundException("News is not found")

        if (params.categoryId && news.categoryId != params.categoryId) {
            let category = await this.categoryService.findById(params.categoryId)
            if (!category) throw new NotFoundException("Category is not found")
        }

        this.newsRepo.update(id, params)

        return {
            message: 'News is updated successfully'
        }
    }
}