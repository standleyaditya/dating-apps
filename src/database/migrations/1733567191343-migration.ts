import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1733567191343 implements MigrationInterface {
    name = 'Migration1733567191343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "swipe" DROP CONSTRAINT "PK_33ca46e3a4c02776c420a0aa819"`);
        await queryRunner.query(`ALTER TABLE "swipe" DROP COLUMN "swipe_id"`);
        await queryRunner.query(`ALTER TABLE "swipe" ADD "swipe_id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "swipe" ADD CONSTRAINT "PK_33ca46e3a4c02776c420a0aa819" PRIMARY KEY ("swipe_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "swipe" DROP CONSTRAINT "PK_33ca46e3a4c02776c420a0aa819"`);
        await queryRunner.query(`ALTER TABLE "swipe" DROP COLUMN "swipe_id"`);
        await queryRunner.query(`ALTER TABLE "swipe" ADD "swipe_id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "swipe" ADD CONSTRAINT "PK_33ca46e3a4c02776c420a0aa819" PRIMARY KEY ("swipe_id")`);
    }

}
