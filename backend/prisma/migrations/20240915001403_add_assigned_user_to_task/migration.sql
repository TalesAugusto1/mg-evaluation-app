-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_userId_fkey`;

-- AlterTable
ALTER TABLE `task` ADD COLUMN `assignedUserId` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `Task_assignedUserId_idx` ON `Task`(`assignedUserId`);

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_assignedUserId_fkey` FOREIGN KEY (`assignedUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `task` RENAME INDEX `Task_projectId_fkey` TO `Task_projectId_idx`;
