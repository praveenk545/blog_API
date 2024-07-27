import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FileUpload{
    @PrimaryGeneratedColumn()
    id:Number;

    @Column()
    file:string;

}