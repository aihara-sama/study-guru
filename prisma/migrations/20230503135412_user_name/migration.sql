/*
  Warnings:

  - Added the required column `userName` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `QuestionReply` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "userName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "QuestionReply" ADD COLUMN     "userName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "userName" TEXT NOT NULL;
