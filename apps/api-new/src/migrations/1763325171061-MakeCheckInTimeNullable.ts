import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeCheckInTimeNullable1763325171061 implements MigrationInterface {
    name = 'MakeCheckInTimeNullable1763325171061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendee" DROP COLUMN "check_in_time"`);
        await queryRunner.query(`ALTER TABLE "attendee" ADD "check_in_time" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendee" DROP COLUMN "check_in_time"`);
        await queryRunner.query(`ALTER TABLE "attendee" ADD "check_in_time" TIMESTAMP NOT NULL`);
    }

}
