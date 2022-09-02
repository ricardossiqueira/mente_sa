-- CreateTable
CREATE TABLE "PacientSession" (
    "id" TEXT NOT NULL,
    "pacientId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PacientSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PacientSession_pacientId_key" ON "PacientSession"("pacientId");

-- CreateIndex
CREATE UNIQUE INDEX "PacientSession_sessionId_key" ON "PacientSession"("sessionId");

-- AddForeignKey
ALTER TABLE "PacientSession" ADD CONSTRAINT "PacientSession_pacientId_fkey" FOREIGN KEY ("pacientId") REFERENCES "Pacient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PacientSession" ADD CONSTRAINT "PacientSession_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
