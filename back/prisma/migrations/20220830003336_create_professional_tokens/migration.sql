-- CreateTable
CREATE TABLE "ProfessionalTokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "professionalId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfessionalTokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProfessionalTokens_token_key" ON "ProfessionalTokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "ProfessionalTokens_professionalId_key" ON "ProfessionalTokens"("professionalId");

-- AddForeignKey
ALTER TABLE "ProfessionalTokens" ADD CONSTRAINT "ProfessionalTokens_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "Professional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
