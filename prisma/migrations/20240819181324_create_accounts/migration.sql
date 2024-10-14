-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "account_number" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
