import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { BoardRepository } from './board.repository';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {

    constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    ) {}

    // constructor(private readonly boardRepository: BoardRepository) {}

    async getAllBoards(): Promise<Board[]> {
        return await this.boardRepository.find();
    }

    async getBoardById(id: number): Promise<Board> {
        const board = await this.boardRepository.findOneBy({id});

        if(!board) {
            throw new NotFoundException(`Can't find Board with id: [${id}]`);
        }

        return board
    }

    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        const {title, description} = createBoardDto;

        const board = this.boardRepository.create({
            title,
            description,
        })

        await this.boardRepository.save(board);
        return board;
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);
        
        board.status = status;
        await this.boardRepository.save(board);
        
        return board;
    }

    async deleteBoard(id: number): Promise<void> {
        const board = await this.boardRepository.delete(id);

        if(board.affected === 0) {
            throw new NotFoundException(`Can't find board id: [${id}]`)
        }
    }
}
