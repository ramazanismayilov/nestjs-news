import { Module } from "@nestjs/common";
import { NewsController } from "./news.controller";
import { NewsService } from "./news.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NewsEntity } from "src/entities/News.entity";
import { NewsActionHistory } from "src/entities/NewsActionHistory.entity";

@Module({
    imports: [TypeOrmModule.forFeature([NewsEntity, NewsActionHistory])],
    controllers: [NewsController],
    providers: [NewsService]
})
export class NewsModule {}  