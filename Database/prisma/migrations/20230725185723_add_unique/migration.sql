/*
  Warnings:

  - A unique constraint covering the columns `[userId,companyName]` on the table `seller` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,companyName]` on the table `supplier` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `FirstName` to the `buyer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LastName` to the `buyer` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_buyer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "discountFactor" REAL NOT NULL DEFAULT 1,
    "discountFactorUpdatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "buyer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_buyer" ("discountFactor", "discountFactorUpdatedAt", "id", "userId") SELECT "discountFactor", "discountFactorUpdatedAt", "id", "userId" FROM "buyer";
DROP TABLE "buyer";
ALTER TABLE "new_buyer" RENAME TO "buyer";
CREATE UNIQUE INDEX "buyer_userId_FirstName_LastName_key" ON "buyer"("userId", "FirstName", "LastName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "seller_userId_companyName_key" ON "seller"("userId", "companyName");

-- CreateIndex
CREATE UNIQUE INDEX "supplier_userId_companyName_key" ON "supplier"("userId", "companyName");
