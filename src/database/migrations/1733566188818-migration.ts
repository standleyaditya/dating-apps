import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1733566188818 implements MigrationInterface {
  name = 'Migration1733566188818';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "swipe" ("swipe_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "action" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "profileProfileId" integer, "swipedProfileId" integer, CONSTRAINT "PK_33ca46e3a4c02776c420a0aa819" PRIMARY KEY ("swipe_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "profile" ("profile_id" SERIAL NOT NULL, "fullname" character varying NOT NULL, "bio" character varying NOT NULL, "swipe_count" integer NOT NULL, "age" integer NOT NULL, "last_swiped_at" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_b0465dda30314a8786db3354a65" PRIMARY KEY ("profile_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "package" ("package_id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, "desc" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_1ff0914c1f178aea0726df298bf" PRIMARY KEY ("package_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "premium" ("premium_id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6034e53c9c3f1446bdb2be4437e" PRIMARY KEY ("premium_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "premium_status" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "profileProfileId" integer, CONSTRAINT "REL_6be5c052a2d1fb1ab60a40cf54" UNIQUE ("profileProfileId"), CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "premium_packages_package" ("premiumPremiumId" integer NOT NULL, "packagePackageId" integer NOT NULL, CONSTRAINT "PK_5be907d98a34fcab675b0cca25f" PRIMARY KEY ("premiumPremiumId", "packagePackageId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f189b6dfc6a6b7eb967e8e8ee3" ON "premium_packages_package" ("premiumPremiumId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4e8e6aee7da9e31f5fbaf9a32e" ON "premium_packages_package" ("packagePackageId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user_premium_premium" ("userUserId" uuid NOT NULL, "premiumPremiumId" integer NOT NULL, CONSTRAINT "PK_b94a23d7d90da22407863cd6d9d" PRIMARY KEY ("userUserId", "premiumPremiumId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7075e4a43db5ffdba7081ab69d" ON "user_premium_premium" ("userUserId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1dd0bb3a7513e7fde05880d757" ON "user_premium_premium" ("premiumPremiumId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "swipe" ADD CONSTRAINT "FK_5cc9eedd62e6b04710a5d344177" FOREIGN KEY ("profileProfileId") REFERENCES "profile"("profile_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "swipe" ADD CONSTRAINT "FK_697a8ac0a214dc207a744243c03" FOREIGN KEY ("swipedProfileId") REFERENCES "profile"("profile_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_6be5c052a2d1fb1ab60a40cf54b" FOREIGN KEY ("profileProfileId") REFERENCES "profile"("profile_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "premium_packages_package" ADD CONSTRAINT "FK_f189b6dfc6a6b7eb967e8e8ee39" FOREIGN KEY ("premiumPremiumId") REFERENCES "premium"("premium_id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "premium_packages_package" ADD CONSTRAINT "FK_4e8e6aee7da9e31f5fbaf9a32e2" FOREIGN KEY ("packagePackageId") REFERENCES "package"("package_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_premium_premium" ADD CONSTRAINT "FK_7075e4a43db5ffdba7081ab69d8" FOREIGN KEY ("userUserId") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_premium_premium" ADD CONSTRAINT "FK_1dd0bb3a7513e7fde05880d757d" FOREIGN KEY ("premiumPremiumId") REFERENCES "premium"("premium_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_premium_premium" DROP CONSTRAINT "FK_1dd0bb3a7513e7fde05880d757d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_premium_premium" DROP CONSTRAINT "FK_7075e4a43db5ffdba7081ab69d8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "premium_packages_package" DROP CONSTRAINT "FK_4e8e6aee7da9e31f5fbaf9a32e2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "premium_packages_package" DROP CONSTRAINT "FK_f189b6dfc6a6b7eb967e8e8ee39"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_6be5c052a2d1fb1ab60a40cf54b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "swipe" DROP CONSTRAINT "FK_697a8ac0a214dc207a744243c03"`,
    );
    await queryRunner.query(
      `ALTER TABLE "swipe" DROP CONSTRAINT "FK_5cc9eedd62e6b04710a5d344177"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1dd0bb3a7513e7fde05880d757"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7075e4a43db5ffdba7081ab69d"`,
    );
    await queryRunner.query(`DROP TABLE "user_premium_premium"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4e8e6aee7da9e31f5fbaf9a32e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f189b6dfc6a6b7eb967e8e8ee3"`,
    );
    await queryRunner.query(`DROP TABLE "premium_packages_package"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "premium"`);
    await queryRunner.query(`DROP TABLE "package"`);
    await queryRunner.query(`DROP TABLE "profile"`);
    await queryRunner.query(`DROP TABLE "swipe"`);
  }
}
