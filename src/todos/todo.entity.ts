import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: false })
    isComplete: boolean;

    @Column()
    task: string;

    @Column({ default: new Date(Date.now()) })
    createdAt: Date;

    @Column({ default: new Date(Date.now()) })
    updatedAt: Date;
}
