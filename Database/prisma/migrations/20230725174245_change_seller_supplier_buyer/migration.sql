/*
  Warnings:

  - Added the required column `companyName` to the `seller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyName` to the `supplier` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_seller" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "companyName" TEXT NOT NULL,
    CONSTRAINT "seller_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_seller" ("id", "userId") SELECT "id", "userId" FROM "seller";
DROP TABLE "seller";
ALTER TABLE "new_seller" RENAME TO "seller";
CREATE TABLE "new_supplier" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "discountFactor" REAL NOT NULL DEFAULT 1,
    "companyName" TEXT NOT NULL,
    CONSTRAINT "supplier_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_supplier" ("id", "userId") SELECT "id", "userId" FROM "supplier";
DROP TABLE "supplier";
ALTER TABLE "new_supplier" RENAME TO "supplier";
CREATE TABLE "new_buyer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "discountFactor" REAL NOT NULL DEFAULT 1,
    CONSTRAINT "buyer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_buyer" ("id", "userId") SELECT "id", "userId" FROM "buyer";
DROP TABLE "buyer";
ALTER TABLE "new_buyer" RENAME TO "buyer";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
