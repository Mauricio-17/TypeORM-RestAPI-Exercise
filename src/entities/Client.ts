import { Entity,  Column, OneToMany, PrimaryColumn, BaseEntity, PrimaryGeneratedColumn} from "typeorm";
import { 
    IsString,
    IsNumber,
    IsEmail,
    Length,
    Max
} from "class-validator";
import {Car} from "./Car"

@Entity()
export class Client extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    code: number;

    @Column()
    @IsString()
    @Length(1, 30)
    name: string;

    @Column()
    @IsString()
    @Length(1, 30)
    location: string;

    @Column()
    @IsString()
    @Length(1, 30)
    city: string;

    @Column()
    @IsString()
    @Length(8, 9)
    cellphone: string;

    @Column()
    @IsString()
    NIF: string;

    @OneToMany(() => Car, (car) => car.code)
    cars: Car[];

}

