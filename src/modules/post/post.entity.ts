import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column()
  photo: string;

  @Column()
  likes: string;

  @Column()
  comments: string;

  @Column()
  postedBy: string;
}
