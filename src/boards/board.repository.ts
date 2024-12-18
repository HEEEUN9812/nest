import { DataSource, Repository } from "typeorm";
import { Board } from "./board.entity";

export class BoardRepository extends Repository<Board>{
    constructor(private dataSource:DataSource) {
        super(Board, dataSource.createEntityManager());
    }
}