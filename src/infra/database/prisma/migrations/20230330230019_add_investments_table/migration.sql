-- CreateTable
CREATE TABLE "investments" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "subtype" TEXT NOT NULL,
    "tax" TEXT,
    "name" TEXT,
    "quantity" INTEGER,
    "applicationDate" TIMESTAMP(3) NOT NULL,
    "redeemDate" TIMESTAMP(3),
    "hasLiquidity" BOOLEAN NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "userId" TEXT,
    "accountId" TEXT,
    "targetId" TEXT,

    CONSTRAINT "investments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "investments" ADD CONSTRAINT "investments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investments" ADD CONSTRAINT "investments_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investments" ADD CONSTRAINT "investments_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "targets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
