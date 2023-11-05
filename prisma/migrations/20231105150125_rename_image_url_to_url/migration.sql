/*
  Warnings:

  - You are about to drop the column `image_url` on the `point_images` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[point_id,user_id]` on the table `point_ratings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `point_images` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_point_images" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "point_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "point_images_point_id_fkey" FOREIGN KEY ("point_id") REFERENCES "points" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_point_images" ("created_at", "id", "point_id", "updated_at") SELECT "created_at", "id", "point_id", "updated_at" FROM "point_images";
DROP TABLE "point_images";
ALTER TABLE "new_point_images" RENAME TO "point_images";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "point_ratings_point_id_user_id_key" ON "point_ratings"("point_id", "user_id");
