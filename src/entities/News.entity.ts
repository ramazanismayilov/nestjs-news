import { generateSlug } from 'src/utils/slug.utils';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from './Category.entity';
import { NewsActionHistory } from './NewsActionHistory.entity';


@Entity('news')
export class NewsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  thumbnail: string;

  @Column()
  slug: string;

  @Column({ default: 0 })
  like: number;

  @Column({ default: 0 })
  dislike: number;

  @Column({ default: 0 })
  views: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  categoryId: number

  @ManyToOne(() => CategoryEntity, (item: CategoryEntity) => item.news)
  category: CategoryEntity

  @OneToMany(() => NewsActionHistory, (item: NewsActionHistory) => item.news)
  actionHistory: NewsActionHistory[]

  @BeforeInsert()
  @BeforeUpdate()
  beforeUpsert() {
    if (!this.slug && this.title) {
      this.slug = generateSlug(this.title)
    }
  }
}