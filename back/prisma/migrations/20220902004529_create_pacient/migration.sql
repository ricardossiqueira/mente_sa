/*
  Warnings:

  - A unique constraint covering the columns `[pacientId]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pacientId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "pacientId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Pacient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pacient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pacient_email_key" ON "Pacient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pacient_cpf_key" ON "Pacient"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Session_pacientId_key" ON "Session"("pacientId");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_pacientId_fkey" FOREIGN KEY ("pacientId") REFERENCES "Pacient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
