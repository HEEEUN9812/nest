import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "./board-status.enum";

@Entity()
export class Board {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({type:'enum', enum: BoardStatus, default:BoardStatus.PUBLIC})
    status: BoardStatus;
}