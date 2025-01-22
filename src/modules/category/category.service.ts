import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "src/entities/Category.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity)
        private categoryRepo: Repository<CategoryEntity>
    ) { }

    list() {
    }

    create() {
    }
}