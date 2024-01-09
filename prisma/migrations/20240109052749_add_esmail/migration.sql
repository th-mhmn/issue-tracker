-- CreateTable
CREATE TABLE `Esmail` (
    `flag` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Esmail_flag_key`(`flag`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
