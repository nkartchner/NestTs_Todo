import {
    Put,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Controller,
} from '@nestjs/common';
import { Todo } from './todo.entity';
import { UpdateResult } from 'typeorm';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todos')
export class TodosController {
    constructor(private todosService: TodosService) {}

    @Post()
    create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
        return this.todosService.create(createTodoDto);
    }

    @Get()
    findAll(): Promise<Todo[]> {
        return this.todosService.findAll();
    }

    @Put(':id')
    updateOne(
        @Body() todo: Partial<Todo>,
        @Param('id') id: string,
    ): Promise<UpdateResult> {
        return this.todosService.update({ id: +id, ...todo });
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string): Promise<void> {
        return this.todosService.removeOne(id);
    }
}
