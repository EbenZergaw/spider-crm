/*
  Warnings:

  - The primary key for the `Task` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[taskID]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Task" DROP CONSTRAINT "Task_pkey",
ALTER COLUMN "taskID" DROP DEFAULT,
ALTER COLUMN "taskID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Task_pkey" PRIMARY KEY ("taskID");
DROP SEQUENCE "Task_taskID_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Task_taskID_key" ON "Task"("taskID");
