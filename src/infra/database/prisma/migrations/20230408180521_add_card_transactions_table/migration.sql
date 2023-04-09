-- CreateTable
CREATE TABLE "card-transactions" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "type" TEXT NOT NULL,
    "cardId" TEXT,
    "userId" TEXT,

    CONSTRAINT "card-transactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "card-transactions" ADD CONSTRAINT "card-transactions_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card-transactions" ADD CONSTRAINT "card-transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
