/*
  Warnings:

  - You are about to drop the column `comements` on the `posts` table. All the data in the column will be lost.
  - Added the required column `summary` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "comements",
ADD COLUMN     "comments" JSONB,
ADD COLUMN     "summary" TEXT NOT NULL,
ALTER COLUMN "views" DROP NOT NULL,
ALTER COLUMN "likes" DROP NOT NULL;

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PostTotags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PostTotags_AB_unique" ON "_PostTotags"("A", "B");

-- CreateIndex
CREATE INDEX "_PostTotags_B_index" ON "_PostTotags"("B");

-- AddForeignKey
ALTER TABLE "_PostTotags" ADD CONSTRAINT "_PostTotags_A_fkey" FOREIGN KEY ("A") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostTotags" ADD CONSTRAINT "_PostTotags_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
