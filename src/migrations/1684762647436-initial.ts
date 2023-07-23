import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1684762647436 implements MigrationInterface {
    name = 'Initial1684762647436'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`clients\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`serverUrl\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_99e921caf21faa2aab020476e4\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_99e921caf21faa2aab020476e4\` ON \`clients\``);
        await queryRunner.query(`DROP TABLE \`clients\``);
    }

}
