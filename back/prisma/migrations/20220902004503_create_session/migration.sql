-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "professionalId" TEXT NOT NULL,
    "scheduleDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "sessionTheme" TEXT NOT NULL,
    "scheduleType" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "sessionType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_professionalId_key" ON "Session"("professionalId");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "Professional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
