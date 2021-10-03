/*
  Warnings:

  - You are about to drop the `JobTable` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "JobTable";

-- CreateTable
CREATE TABLE "JobStatusTable" (
    "id" BIGSERIAL NOT NULL,
    "queue_type" VARCHAR(50) NOT NULL,
    "data" JSONB DEFAULT E'{}',
    "user_id" BIGINT,
    "created_time" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "modified_time" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "completed" BOOLEAN DEFAULT false,
    "completed_on" TIMESTAMP(6),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserStatelessAuthentication" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "data" JSONB NOT NULL DEFAULT E'{}',
    "created_time" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "tries" SMALLINT DEFAULT 0,
    "sent_to" VARCHAR(128) NOT NULL,
    "isActive" BOOLEAN DEFAULT true,
    "auth_type" SMALLINT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatelessAuthenicatonTypes" (
    "id" SMALLINT NOT NULL,
    "StatelessAuthenicatonType" VARCHAR(64) NOT NULL,
    "description" JSONB,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserStatelessAuthentication" ADD FOREIGN KEY ("auth_type") REFERENCES "StatelessAuthenicatonTypes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
