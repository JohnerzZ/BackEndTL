-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.19 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             10.3.0.5771
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for energymarket
CREATE DATABASE IF NOT EXISTS `energymarket` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `energymarket`;

-- Dumping structure for table energymarket.actualtotalload
CREATE TABLE IF NOT EXISTS `actualtotalload` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `EntityCreatedAt` varchar(200) DEFAULT NULL,
  `EntityModifiedAt` varchar(200) DEFAULT NULL,
  `ActionTaskID` bigint NOT NULL,
  `Status` varchar(200) DEFAULT NULL,
  `Year` int NOT NULL,
  `Month` int NOT NULL,
  `Day` int NOT NULL,
  `DateTime` varchar(200) DEFAULT NULL,
  `AreaName` varchar(200) DEFAULT NULL,
  `UpdateTime` varchar(200) DEFAULT NULL,
  `TotalLoadValue` decimal(24,2) NOT NULL,
  `AreaTypeCodeId` int DEFAULT NULL,
  `MapCodeId` int DEFAULT NULL,
  `AreaCodeId` int NOT NULL,
  `ResolutionCodeId` int DEFAULT NULL,
  `RowHash` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_ActualTotalLoad _ResolutionCodeId` (`ResolutionCodeId`),
  KEY `IX_ActualTotalLoad _AreaCodeId` (`AreaCodeId`),
  KEY `IX_ActualTotalLoad _AreaTypeCodeId` (`AreaTypeCodeId`),
  KEY `IX_ActualTotalLoad _MapCodeId` (`MapCodeId`)
) ENGINE=InnoDB AUTO_INCREMENT=56120813 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table energymarket.admins
CREATE TABLE IF NOT EXISTS `admins` (
  `Adminid` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `pass_word` varchar(255) NOT NULL,
  PRIMARY KEY (`Adminid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table energymarket.aggregatedgenerationpertype
CREATE TABLE IF NOT EXISTS `aggregatedgenerationpertype` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `EntityCreatedAt` varchar(200) DEFAULT NULL,
  `EntityModifiedAt` varchar(200) DEFAULT NULL,
  `ActionTaskID` bigint NOT NULL,
  `Status` varchar(200) DEFAULT NULL,
  `Year` int NOT NULL,
  `Month` int NOT NULL,
  `Day` int NOT NULL,
  `DateTime` varchar(200) DEFAULT NULL,
  `AreaName` varchar(200) DEFAULT NULL,
  `UpdateTime` varchar(200) DEFAULT NULL,
  `ActualGenerationOutput` decimal(24,2) NOT NULL,
  `ActualConsuption` decimal(24,2) NOT NULL,
  `AreaTypeCodeId` int DEFAULT NULL,
  `ProductionTypeId` int DEFAULT NULL,
  `ResolutionCodeId` int DEFAULT NULL,
  `MapCodeId` int DEFAULT NULL,
  `AreaCodeId` int NOT NULL,
  `RowHash` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_AggregatedGenerationPerType _AreaCodeId` (`AreaCodeId`),
  KEY `IX_AggregatedGenerationPerType _ResolutionCodeId` (`ResolutionCodeId`),
  KEY `IX_AggregatedGenerationPerType _ProductionTypeId` (`ProductionTypeId`),
  KEY `IX_AggregatedGenerationPerType _MapCodeId` (`MapCodeId`),
  KEY `IX_AggregatedGenerationPerType _AreaTypeCodeId` (`AreaTypeCodeId`)
) ENGINE=InnoDB AUTO_INCREMENT=832887359 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table energymarket.allocatedeicdetail
CREATE TABLE IF NOT EXISTS `allocatedeicdetail` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `EntityCreatedAt` timestamp(6) NOT NULL,
  `EntityModifiedAt` timestamp(6) NOT NULL,
  `MRID` varchar(250) DEFAULT NULL,
  `DocStatusValue` varchar(250) DEFAULT NULL,
  `AttributeInstanceComponent` varchar(250) DEFAULT NULL,
  `LongNames` varchar(250) DEFAULT NULL,
  `DisplayNames` varchar(250) DEFAULT NULL,
  `LastRequestDateAndOrTime` datetime(6) DEFAULT NULL,
  `DeactivateRequestDateAndOrTime` datetime(6) DEFAULT NULL,
  `MarketParticipantStreetAddressCountry` varchar(250) DEFAULT NULL,
  `MarketParticipantACERCode` varchar(250) DEFAULT NULL,
  `MarketParticipantVATcode` varchar(250) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `EICParentMarketDocumentMRID` varchar(250) DEFAULT NULL,
  `ELCResponsibleMarketParticipantMRID` varchar(250) DEFAULT NULL,
  `IsDeleted` bit(1) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table energymarket.areatypecode
CREATE TABLE IF NOT EXISTS `areatypecode` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `EntityCreatedAt` timestamp(6) NOT NULL,
  `EntityModifiedAt` timestamp(6) NOT NULL,
  `AreaTypeCodeText` varchar(255) DEFAULT NULL,
  `AreaTypeCodeNote` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `IX_AreaTypeCode_AreaTypeCodeText` (`AreaTypeCodeText`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table energymarket.dayaheadtotalloadforecast
CREATE TABLE IF NOT EXISTS `dayaheadtotalloadforecast` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `EntityCreatedAt` varchar(200) DEFAULT NULL,
  `EntityModifiedAt` varchar(200) DEFAULT NULL,
  `ActionTaskID` bigint NOT NULL,
  `Status` varchar(200) DEFAULT NULL,
  `Year` int NOT NULL,
  `Month` int NOT NULL,
  `Day` int NOT NULL,
  `DateTime` varchar(200) DEFAULT NULL,
  `AreaName` varchar(200) DEFAULT NULL,
  `UpdateTime` varchar(200) DEFAULT NULL,
  `TotalLoadValue` decimal(24,2) NOT NULL,
  `AreaTypeCodeId` int DEFAULT NULL,
  `MapCodeId` int DEFAULT NULL,
  `AreaCodeId` int NOT NULL,
  `ResolutionCodeId` int DEFAULT NULL,
  `RowHash` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_DayAheadTotalLoadForecast_MapCodeId` (`MapCodeId`),
  KEY `IX_DayAheadTotalLoadForecast_AreaTypeCodeId` (`AreaTypeCodeId`),
  KEY `IX_DayAheadTotalLoadForecast_AreaCodeId` (`AreaCodeId`),
  KEY `IX_DayAheadTotalLoadForecast_ResolutionCodeId` (`ResolutionCodeId`)
) ENGINE=InnoDB AUTO_INCREMENT=33723890 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table energymarket.mapcode
CREATE TABLE IF NOT EXISTS `mapcode` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `EntityCreatedAt` timestamp(6) NOT NULL,
  `EntityModifiedAt` timestamp(6) NOT NULL,
  `MapCodeText` varchar(255) DEFAULT NULL,
  `MapCodeNote` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `IX_MapCode_MapCodeText` (`MapCodeText`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table energymarket.productiontype
CREATE TABLE IF NOT EXISTS `productiontype` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `EntityCreatedAt` timestamp(6) NOT NULL,
  `EntityModifiedAt` timestamp(6) NOT NULL,
  `ProductionTypeText` varchar(255) DEFAULT NULL,
  `ProductionTypeNote` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `IX_ProductionType_ProductionTypeText` (`ProductionTypeText`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table energymarket.resolutioncode
CREATE TABLE IF NOT EXISTS `resolutioncode` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `EntityCreatedAt` timestamp(6) NOT NULL,
  `EntityModifiedAt` timestamp(6) NOT NULL,
  `ResolutionCodeText` varchar(255) DEFAULT NULL,
  `ResolutionCodeNote` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `IX_ResolutionCode_ResolutionCodeText` (`ResolutionCodeText`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table energymarket.users
CREATE TABLE IF NOT EXISTS `users` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `pass_word` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `quota` int NOT NULL,
  `apikey` varchar(14) NOT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
