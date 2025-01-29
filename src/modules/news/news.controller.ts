import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { NewsService } from "./news.service";
import { AuthGuard } from "src/guards/auth.guard";
import { CreateNewsDto } from "./dto/create-news.dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { UpdateNewsDto } from "./dto/update-news.dto";
import { NewsListQueryDto } from "./dto/list-news.dto";
import { NewsActionType } from "./news.types";
import { AuthorizedUser } from "../auth/auth.types";
import { UserRole } from "../user/user.types";
import { Roles } from "src/shared/decorator/role.decorator";

@Controller('news')
export class NewsController {
    constructor(private newsService: NewsService) { }

    @Get()
    list(@Query() query: NewsListQueryDto) {
        return this.newsService.list(query)
    }

    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Roles(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
    create(@Body() body: CreateNewsDto) {
        return this.newsService.create(body)
    }

    @Post(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Roles(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
    update(@Param('id') id: number, @Body() body: UpdateNewsDto) {
        return this.newsService.update(id, body)
    }

    @Post(':id/action/:type')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Roles(UserRole.GUEST)
    action(@Param('id') id: number, @Param('type') type: NewsActionType, @Req() req: AuthorizedUser) {
        return this.newsService.action(id, type, req.user.id)
    }
}