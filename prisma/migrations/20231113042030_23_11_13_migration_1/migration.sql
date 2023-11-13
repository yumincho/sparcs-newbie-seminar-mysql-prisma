-- CreateTable
CREATE TABLE `Account` (
    `accNumber` INTEGER NOT NULL,
    `type` VARCHAR(3) NULL,
    `balance` TEXT NULL,
    `branchNumber` INTEGER NULL,

    INDEX `branchNumber`(`branchNumber`),
    PRIMARY KEY (`accNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Branch` (
    `branchNumber` INTEGER NOT NULL,
    `branchName` VARCHAR(20) NULL,
    `managerSIN` INTEGER NULL,
    `budget` TEXT NULL,

    INDEX `managerSIN`(`managerSIN`),
    PRIMARY KEY (`branchNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `customerID` INTEGER NOT NULL,
    `firstName` VARCHAR(20) NULL,
    `lastName` VARCHAR(20) NULL,
    `income` INTEGER NULL,
    `birthData` VARCHAR(20) NULL,

    PRIMARY KEY (`customerID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee` (
    `sin` INTEGER NOT NULL,
    `firstName` VARCHAR(20) NULL,
    `lastName` VARCHAR(20) NULL,
    `salary` INTEGER NULL,
    `branchNumber` INTEGER NULL,

    INDEX `branchNumber`(`branchNumber`),
    PRIMARY KEY (`sin`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Owns` (
    `customerID` INTEGER NOT NULL,
    `accNumber` INTEGER NOT NULL,

    INDEX `accNumber`(`accNumber`),
    PRIMARY KEY (`customerID`, `accNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transactions` (
    `accNumber` INTEGER NOT NULL,
    `transNumber` INTEGER NOT NULL,
    `amount` TEXT NULL,

    PRIMARY KEY (`accNumber`, `transNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_ibfk_1` FOREIGN KEY (`branchNumber`) REFERENCES `Branch`(`branchNumber`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Branch` ADD CONSTRAINT `Branch_ibfk_1` FOREIGN KEY (`managerSIN`) REFERENCES `Employee`(`sin`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_ibfk_1` FOREIGN KEY (`branchNumber`) REFERENCES `Branch`(`branchNumber`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Owns` ADD CONSTRAINT `Owns_ibfk_1` FOREIGN KEY (`customerID`) REFERENCES `Customer`(`customerID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Owns` ADD CONSTRAINT `Owns_ibfk_2` FOREIGN KEY (`accNumber`) REFERENCES `Account`(`accNumber`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_ibfk_1` FOREIGN KEY (`accNumber`) REFERENCES `Account`(`accNumber`) ON DELETE RESTRICT ON UPDATE RESTRICT;
