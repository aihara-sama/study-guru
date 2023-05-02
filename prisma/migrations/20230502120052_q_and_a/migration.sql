/*
  Warnings:

  - Added the required column `userImage` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userImage` to the `QuestionReply` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "userImage" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "QuestionReply" ADD COLUMN     "userImage" TEXT NOT NULL;
