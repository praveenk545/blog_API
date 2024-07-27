
import { NewUser } from "src/new-auth/entities/new-user.entity";
import { Newcategory } from "src/newcategory/entities/newcategory.entity";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import slugify from "slugify";
import { Exclude } from "class-transformer";
@Entity()
export class Newpost {

    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    title:string;
    @Column()
    content:string;
    @Column({default:null})
    slug:string;
    @Column({nullable:true})
    maingImageUrl:string;

    // @CreateDateColumn()
    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
    createAt:Date;
    // @UpdateDateColumn()
    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
    updateAt:Date;


@Column({default:null})
@Exclude()
userId:number;

@Column({nullable:true})
@Exclude()
categoryId:number;

// joincolum contain error for foreginkey contrain
// you made this mistake for give some id in join coloumn
// userId ans category id are diffrent

    @ManyToOne(()=>NewUser,(user)=>user.posts,{eager:true})
    @JoinColumn({name:'userId',referencedColumnName:'id'})
    user:NewUser

    @ManyToOne(()=>Newcategory, (cat)=>cat.post,{eager:true})
    
    @JoinColumn({name:'categoryId',referencedColumnName:'id'})
    category:Newcategory
 

    @BeforeInsert()
    slugifyPost(){
        this.slug=slugify(this.title.substring(0,20),{lower:true,replacement:'_'});
       

    }
}

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    image:string;
}