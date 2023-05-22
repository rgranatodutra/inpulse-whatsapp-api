import { 
    Column,
    Entity, 
    PrimaryGeneratedColumn, 
} from "typeorm";

@Entity('clients')
export class Client
 {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: '50', unique: true, nullable: false })
    name: string;

    @Column()
    serverUrl: string;
};