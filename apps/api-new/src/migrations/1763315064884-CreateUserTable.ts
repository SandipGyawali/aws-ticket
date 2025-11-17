import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1763315064884 implements MigrationInterface {
    name = 'CreateUserTable1763315064884'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "attendee" ("id" SERIAL NOT NULL, "full_name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "food_preference" character varying NOT NULL, "session_choice" text array NOT NULL DEFAULT '{}', "checked_in" boolean NOT NULL DEFAULT false, "check_in_time" TIMESTAMP NOT NULL, "lunch" boolean NOT NULL DEFAULT false, "lunch2" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9ccf96017c5f96f5c58351f3a64" UNIQUE ("email"), CONSTRAINT "PK_070338c19378315cb793abac656" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "attendee"`);
    }

}
