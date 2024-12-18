import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {

    constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>
    ) {
        this.boardRepository = boardRepository;
    }

    // private boards: Board[] = [];

    getAllBoards(): Board[] {
        return this.boardRepository.find();
    }

    getBoardById(id: string): Board {
        const board = this.boards.find((board) => board.id === id);

        if(!board) {
            throw new NotFoundException(`Can't find Board with id: [${id}]`);
        }

        return board
    }

    createBoard(createBoardDto: CreateBoardDto) {
        const {title, description} = createBoardDto;

        const board: Board = {
            id: uuid(),
            title,
            description,
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board);
        return board;
    }

    updateBoardStatus(id: string, status: BoardStatus): Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }

    deleteBoard(id: string): void {
        const board = this.getBoardById(id);
        this.boards = this.boards.filter((board) => board.id !== board.id);
    }
}
