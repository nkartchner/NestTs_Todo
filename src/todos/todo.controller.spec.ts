import { Test } from '@nestjs/testing';
import { Todo } from './todo.entity';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

describe('TodosController', () => {
    let todosController: TodosController;
    let todosService: TodosService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [TodosController],
            providers: [TodosService],
        }).compile();
        todosService = moduleRef.get<TodosService>(TodosService);
        todosController = moduleRef.get<TodosController>(TodosController);
    });

    describe('findAll', () => {
        it('should return an array of todos', async () => {
            const result: Todo[] = [
                {
                    createdAt: new Date(Date.now()),
                    updatedAt: new Date(Date.now()),
                    id: 1,
                    isComplete: false,
                    task: 'Learn how to test in nest',
                },
                {
                    createdAt: new Date(Date.now() + 10),
                    updatedAt: new Date(Date.now() + 10),
                    id: 2,
                    isComplete: false,
                    task: 'Write your first test in nest',
                },
                {
                    createdAt: new Date(Date.now() + 50),
                    updatedAt: new Date(Date.now() + 50),
                    id: 3,
                    isComplete: false,
                    task: 'Run your first E2E test in nest',
                },
                {
                    createdAt: new Date(Date.now() + 100),
                    updatedAt: new Date(Date.now() + 100),
                    id: 4,
                    isComplete: false,
                    task: 'Run your first Unit test in nest',
                },
            ];
            jest.spyOn(todosService, 'findAll').mockImplementation(
                () => result,
            );
            expect(await todosController.findAll()).toBe(result);
        });
    });
});
