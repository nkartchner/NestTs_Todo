import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todo) private todoRepository: Repository<Todo>,
    ) {}

    create(createTodoDto: CreateTodoDto): Promise<Todo> {
        const todo = new Todo();
        todo.task = createTodoDto.task;
        return this.todoRepository.save(todo);
    }

    findAll(): Promise<Todo[]> {
        return this.todoRepository.find();
    }

    findOne(id: string): Promise<Todo> {
        return this.todoRepository.findOne(id);
    }

    async removeOne(id: string): Promise<void> {
        await this.todoRepository.delete(id);
    }

    update(todo: Partial<Pick<Todo, 'id'>>): Promise<UpdateResult> {
        return this.todoRepository.update(todo.id, {
            ...todo,
            updatedAt: Date.now(),
        });
    }
}
