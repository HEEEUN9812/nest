import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {

    constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    ) {}

    // constructor(private readonly boardRepository: BoardRepository) {}

    async getAllBoards(user: User): Promise<Board[]> {
        const query = this.boardRepository.createQueryBuilder('board');

        query.where('board.userId = :userId', {userId: user.id});

        const boards = await query.getMany();

        return boards;
    }

    async getBoardById(id: number): Promise<Board> {
        const board = await this.boardRepository.findOneBy({id});

        if(!board) {
            throw new NotFoundException(`Can't find Board with id: [${id}]`);
        }

        return board
    }

    async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        const {title, description} = createBoardDto;

        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            user
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

    async deleteBoard(id: number, user: User): Promise<void> {
        const board = await this.boardRepository.delete({id, user});

        if(board.affected === 0) {
            throw new NotFoundException(`Can't find board id: [${id}]`)
        }
    }
}
