/*
  Warnings:

  - The primary key for the `Task` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `taskID` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Task" DROP CONSTRAINT "Task_pkey",
DROP COLUMN "taskID",
ADD COLUMN     "taskID" SERIAL NOT NULL,
ADD CONSTRAINT "Task_pkey" PRIMARY KEY ("taskID");
