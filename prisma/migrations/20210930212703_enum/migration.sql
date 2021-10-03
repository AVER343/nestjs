/*
  Warnings:

  - Changed the type of `queue_type` on the `QueueActive` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "QUEUES" AS ENUM ('SEND_EMAIL');

-- AlterTable
ALTER TABLE "QueueActive" DROP COLUMN "queue_type",
ADD COLUMN     "queue_type" "QUEUES" NOT NULL;
