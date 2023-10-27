-- CreateTable
CREATE TABLE "game" (
    "id" SERIAL NOT NULL,
    "id_igdb" VARCHAR(255),

    CONSTRAINT "game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gamelist" (
    "id" SERIAL NOT NULL,
    "gameid" INTEGER,
    "listid" INTEGER,
    "profileid" INTEGER,

    CONSTRAINT "gamelist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "list" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(255),

    CONSTRAINT "list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "email" VARCHAR(255),
    "password" VARCHAR(255),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_email_key" ON "profile"("email");

-- AddForeignKey
ALTER TABLE "gamelist" ADD CONSTRAINT "gamelist_gameid_fkey" FOREIGN KEY ("gameid") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gamelist" ADD CONSTRAINT "gamelist_listid_fkey" FOREIGN KEY ("listid") REFERENCES "list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gamelist" ADD CONSTRAINT "gamelist_profileid_fkey" FOREIGN KEY ("profileid") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
