import { Entity,  Column, ManyToOne, PrimaryColumn, BaseEntity, OneToMany} from "typeorm";
import { 
    IsNumber,
    IsString,
    Length,
    Min,
    Max
} from "class-validator";
import {Client} from "./Client";
import {Revision} from "./Revision";

@Entity()
export class Car extends BaseEntity{

    @PrimaryColumn()
    @IsString()
    @Length(5,5)
    code: string;

    @Column()
    @IsString()
    @Length(1, 30)
    brand: string;

    @Column()
    @IsString()
    @Length(1, 25)
    color: string;

    @Column()
    @IsNumber()
    @Min(0.0)
    @Max(99.99)
    price: number;

    @Column()
    @IsString()
    @Length(1, 30)
    registration: string;

    @ManyToOne(() => Client, (client) => client.code) 
    client: Client;

    @OneToMany(() => Revision, (revision) => revision.code)
    revisions: Revision[]
}