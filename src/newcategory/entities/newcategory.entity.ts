
import { Newpost } from "src/newpost/entities/newpost.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity("Newcategory")
export class Newcategory {
    @PrimaryGeneratedColumn()
id:number;

 @Column()
title:string;

@Column()
description:string;

@OneToMany(()=>Newpost,(post)=>post.category)
post:Newpost;
}
