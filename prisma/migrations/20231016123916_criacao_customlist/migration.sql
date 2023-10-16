-- CreateTable
CREATE TABLE "CustomList" (
    "id" SERIAL NOT NULL,
    "id_external_igdb" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "added_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CustomList" ADD CONSTRAINT "CustomList_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
