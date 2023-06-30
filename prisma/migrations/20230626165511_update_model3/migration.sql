/*
  Warnings:

  - You are about to drop the column `avatar` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `dob` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "avatar",
DROP COLUMN "dob",
ADD COLUMN     "date_of_birth" DATE,
ALTER COLUMN "bio" DROP DEFAULT,
ALTER COLUMN "gender" DROP DEFAULT;
