import { Entity,  Column, ManyToOne, PrimaryColumn, BaseEntity, PrimaryGeneratedColumn} from "typeorm";
import { 
    IsNumber,
    IsBoolean
} from "class-validator";
import { Car } from "./Car";

@Entity()
export class Revision extends BaseEntity {

    @PrimaryGeneratedColumn()
    code: number;

    @Column()
    @IsBoolean()
    filterChange: boolean;

    @Column()
    @IsBoolean()
    oilChange: boolean;

    @ManyToOne(() => Car, (car) => car.code)
    car: Car;

}