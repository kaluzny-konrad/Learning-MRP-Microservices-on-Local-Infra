/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `productId` on table `sellerSubOffer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sellerOfferId` on table `sellerSubOffer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `productId` on table `supplierSubOffer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `supplierOfferId` on table `supplierSubOffer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `buyerId` on table `buyerOrder` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sellerOfferId` on table `buyerOrder` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sellerId` on table `sellerOrder` required. This step will fail if there are existing NULL values in that column.
  - Made the column `supplierOfferId` on table `sellerOrder` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sellerId` on table `sellerOffers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `supplierId` on table `supplierOffers` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_buyer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "discountFactor" REAL NOT NULL DEFAULT 1,
    "discountFactorUpdatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "buyer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_buyer" ("discountFactor", "id", "userId") SELECT "discountFactor", "id", "userId" FROM "buyer";
DROP TABLE "buyer";
ALTER TABLE "new_buyer" RENAME TO "buyer";
CREATE TABLE "new_sellerSubOffer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" INTEGER NOT NULL,
    "sellerOfferId" INTEGER NOT NULL,
    CONSTRAINT "sellerSubOffer_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "sellerSubOffer_sellerOfferId_fkey" FOREIGN KEY ("sellerOfferId") REFERENCES "sellerOffers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_sellerSubOffer" ("createdAt", "id", "price", "productId", "quantity", "sellerOfferId", "updatedAt") SELECT "createdAt", "id", "price", "productId", "quantity", "sellerOfferId", "updatedAt" FROM "sellerSubOffer";
DROP TABLE "sellerSubOffer";
ALTER TABLE "new_sellerSubOffer" RENAME TO "sellerSubOffer";
CREATE TABLE "new_supplierSubOffer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" INTEGER NOT NULL,
    "supplierOfferId" INTEGER NOT NULL,
    CONSTRAINT "supplierSubOffer_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "supplierSubOffer_supplierOfferId_fkey" FOREIGN KEY ("supplierOfferId") REFERENCES "supplierOffers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_supplierSubOffer" ("createdAt", "id", "price", "productId", "quantity", "supplierOfferId", "updatedAt") SELECT "createdAt", "id", "price", "productId", "quantity", "supplierOfferId", "updatedAt" FROM "supplierSubOffer";
DROP TABLE "supplierSubOffer";
ALTER TABLE "new_supplierSubOffer" RENAME TO "supplierSubOffer";
CREATE TABLE "new_seller" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    CONSTRAINT "seller_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_seller" ("companyName", "id", "userId") SELECT "companyName", "id", "userId" FROM "seller";
DROP TABLE "seller";
ALTER TABLE "new_seller" RENAME TO "seller";
CREATE TABLE "new_buyerOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "buyerId" INTEGER NOT NULL,
    "sellerOfferId" INTEGER NOT NULL,
    CONSTRAINT "buyerOrder_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "buyer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "buyerOrder_sellerOfferId_fkey" FOREIGN KEY ("sellerOfferId") REFERENCES "sellerOffers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_buyerOrder" ("buyerId", "createdAt", "id", "sellerOfferId", "updatedAt") SELECT "buyerId", "createdAt", "id", "sellerOfferId", "updatedAt" FROM "buyerOrder";
DROP TABLE "buyerOrder";
ALTER TABLE "new_buyerOrder" RENAME TO "buyerOrder";
CREATE TABLE "new_sellerOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sellerId" INTEGER NOT NULL,
    "supplierOfferId" INTEGER NOT NULL,
    CONSTRAINT "sellerOrder_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "seller" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "sellerOrder_supplierOfferId_fkey" FOREIGN KEY ("supplierOfferId") REFERENCES "supplierOffers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_sellerOrder" ("createdAt", "id", "sellerId", "supplierOfferId", "updatedAt") SELECT "createdAt", "id", "sellerId", "supplierOfferId", "updatedAt" FROM "sellerOrder";
DROP TABLE "sellerOrder";
ALTER TABLE "new_sellerOrder" RENAME TO "sellerOrder";
CREATE TABLE "new_sellerOffers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sellerId" INTEGER NOT NULL,
    "closed" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "sellerOffers_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "seller" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_sellerOffers" ("closed", "createdAt", "id", "sellerId", "updatedAt") SELECT "closed", "createdAt", "id", "sellerId", "updatedAt" FROM "sellerOffers";
DROP TABLE "sellerOffers";
ALTER TABLE "new_sellerOffers" RENAME TO "sellerOffers";
CREATE TABLE "new_supplier" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "discountFactor" REAL NOT NULL DEFAULT 1,
    "discountFactorUpdatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "companyName" TEXT NOT NULL,
    CONSTRAINT "supplier_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_supplier" ("companyName", "discountFactor", "id", "userId") SELECT "companyName", "discountFactor", "id", "userId" FROM "supplier";
DROP TABLE "supplier";
ALTER TABLE "new_supplier" RENAME TO "supplier";
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "passwordSalt" TEXT NOT NULL,
    "passwordDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_user" ("createdAt", "email", "id", "name", "passwordDate", "passwordHash", "passwordSalt", "updatedAt") SELECT "createdAt", "email", "id", "name", "passwordDate", "passwordHash", "passwordSalt", "updatedAt" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
CREATE TABLE "new_supplierOffers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "supplierId" INTEGER NOT NULL,
    "closed" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "supplierOffers_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "supplier" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_supplierOffers" ("closed", "createdAt", "id", "supplierId", "updatedAt") SELECT "closed", "createdAt", "id", "supplierId", "updatedAt" FROM "supplierOffers";
DROP TABLE "supplierOffers";
ALTER TABLE "new_supplierOffers" RENAME TO "supplierOffers";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
