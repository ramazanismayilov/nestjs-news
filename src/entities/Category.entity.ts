import {
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { generateSlug } from 'src/utils/slug.utils';
import { NewsEntity } from './News.entity';

@Entity('category')
export class CategoryEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    slug: string;

    @OneToMany(() => NewsEntity, (item: NewsEntity) => item.category)
    news: NewsEntity[]

    @BeforeInsert()
    @BeforeUpdate()
    beforeUpsert() {
        if (!this.slug && this.name) {
            this.slug = generateSlug(this.name)
        }
    }
}