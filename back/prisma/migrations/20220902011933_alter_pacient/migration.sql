/*
  Warnings:

  - Added the required column `address` to the `Pacient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telephone` to the `Pacient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pacient" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "telephone" TEXT NOT NULL;
