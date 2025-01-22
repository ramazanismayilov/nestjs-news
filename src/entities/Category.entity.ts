import {
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { generateSlug } from 'src/utils/slug.utils';

@Entity('category')
export class CategoryEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    slug: string;

    @BeforeInsert()
    @BeforeUpdate()
    beforeUpsert() {
        if (!this.slug && this.name) {
            this.slug = generateSlug(this.name)
        }
    }
}