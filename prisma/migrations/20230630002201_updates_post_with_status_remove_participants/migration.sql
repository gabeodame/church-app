/*
  Warnings:

  - The `published` column on the `posts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `_PostTotags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `participants` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- DropForeignKey
ALTER TABLE "_PostTotags" DROP CONSTRAINT "_PostTotags_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostTotags" DROP CONSTRAINT "_PostTotags_B_fkey";

-- DropForeignKey
ALTER TABLE "participants" DROP CONSTRAINT "participants_userId_fkey";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "published",
ADD COLUMN     "published" "PostStatus" NOT NULL DEFAULT 'DRAFT';

-- DropTable
DROP TABLE "_PostTotags";

-- DropTable
DROP TABLE "participants";

-- CreateTable
CREATE TABLE "_PostToTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PostToTags_AB_unique" ON "_PostToTags"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToTags_B_index" ON "_PostToTags"("B");

-- AddForeignKey
ALTER TABLE "_PostToTags" ADD CONSTRAINT "_PostToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTags" ADD CONSTRAINT "_PostToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
