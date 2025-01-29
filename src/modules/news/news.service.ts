import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NewsEntity } from "src/entities/News.entity";
import { FindOptionsOrder, FindOptionsWhere, Repository } from "typeorm";
import { CreateNewsDto } from "./dto/create-news.dto";
import { CategoryService } from "../category/category.service";
import { UpdateNewsDto } from "./dto/update-news.dto";
import { NewsListQueryDto } from "./dto/list-news.dto";
import { NewsActionType } from "./news.types";
import { NewsActionHistory } from "src/entities/NewsActionHistory.entity";

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(NewsEntity)
        private newsRepo: Repository<NewsEntity>,
        private categoryService: CategoryService,
        @InjectRepository(NewsActionHistory)
        private newsActionHistoryRepo: Repository<NewsActionHistory>
    ) { }

    async list(params: NewsListQueryDto) {
        let where: FindOptionsWhere<NewsEntity> = {}
        let order: FindOptionsOrder<NewsEntity> = {}

        if (params.popular) {
            order = {
                views: 'DESC',
                createdAt: 'DESC'
            }
        } else if (params.top) {
            order = {
                like: 'DESC',
                createdAt: 'DESC'
            }
        } else {
            order = {
                createdAt: 'DESC'
            }
        }

        if (params.category) {
            where.categoryId = params.category
        }

        let [news, total] = await this.newsRepo.findAndCount({
            where,
            relations: ['category'],
            order,
            take: params.limit,
            skip: (params.page - 1) * params.limit
        })

        return {
            news,
            total
        }
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

    async action(newsId: number, type: NewsActionType, userId: number) {
        let item = await this.newsRepo.findOne({ where: { id: newsId } })
        if (!item) throw new NotFoundException("News is not found")

        let userAction = await this.newsActionHistoryRepo.findOne({
            where: {
                newsId,
                userId,
                actionType: type
            }
        })

        let increaseValue = 1

        if (userAction && type !== NewsActionType.VIEW) {
            await userAction.remove()
            increaseValue = -1
        } else {
            await this.newsActionHistoryRepo.save({
                newsId,
                userId,
                actionType: type
            })
        }

        switch (type) {
            case NewsActionType.LIKE:
                await this.newsRepo.increment({ id: item.id }, 'like', increaseValue)

                break;
            case NewsActionType.DISLIKE:
                await this.newsRepo.increment({ id: item.id }, 'dislike', increaseValue)

                break;

            case NewsActionType.VIEW:
                await this.newsRepo.increment({ id: item.id }, 'views', increaseValue)

                break;

            default:
                throw new BadRequestException("Action you've provided invalid")
        }

        return {
            message: increaseValue === 1 ? 'Actions is completed' : 'Action is removed'
        }
    }
}