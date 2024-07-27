
import { Newpost } from "src/newpost/entities/newpost.entity";
import { AfterInsert, BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs'
import { Exclude } from "class-transformer";
import { UserRoles } from "../user-roles";
@Entity("NewUser")
export class NewUser {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    firstName:string;

    @Column()
    lastName:string

    @Column()
    email:string

    @Column({select:false})
    // here is explanation for select:false if you this you cannot access the password for response just like hide.
    // @Exclude()
    password:string;
    @Column()
    profilePic:string;

    @Column({type:'enum',enum:UserRoles,default:UserRoles.Reader})
    roles:UserRoles
// 
    @OneToMany(()=>Newpost,(post)=>post.user)
    posts:Newpost

    @BeforeInsert()
    hashPassword(){
        this.password=bcrypt.hashSync(this.password,10)
    }
  @AfterInsert()
  what(){
    
  }
}
