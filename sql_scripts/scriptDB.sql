DROP DATABASE IF EXISTS Azura;
CREATE DATABASE Azura;

USE Azura;

DROP TABLE IF EXISTS Vehicle;

CREATE TABLE Vehicle (
	Id INT AUTO_INCREMENT,
    Make TINYTEXT NOT NULL,
    Model TINYTEXT NOT NULL,
    Mileage INT NOT NULL,
    Colour TINYTEXT,
    Location TINYTEXT,
    `Value` INT NOT NULL,
    CreatedAt DATETIME DEFAULT NOW(),
    ManualEntry BIT DEFAULT 1,
    PRIMARY KEY (Id)
);

DELETE FROM Vehicle;

INSERT INTO Vehicle (
    Make,
    Model,
    Mileage,
    Colour,
    Location,
    `Value`
) 
VALUES 
('Toyota', '2013', 56000, 'Silver', 'Durban', 120000), 
('Hyundai', '2010', 150000, 'Red', 'PTA', 100000);

DROP PROCEDURE IF EXISTS sp_InsertVehicleBMWAndVolkswagen;

DELIMITER //

CREATE PROCEDURE sp_InsertVehicleBMWAndVolkswagen()
BEGIN
    
	SET @maxMileage = 100000;
	SET @minMileage = 50000;
	SET @maxVehicleValue = 150000;
	SET @minVehicleValue = 100000;

    SET @bmwMileage = (SELECT FLOOR( RAND() * (@maxMileage - @minMileage) + @minMileage));
    SET @volkswagenMileage = (SELECT FLOOR( RAND() * (@maxMileage - @minMileage) + @minMileage));
    SET @bmwPrice = (SELECT FLOOR( RAND() * (@maxVehicleValue - @minVehicleValue) + @minVehicleValue));
    SET @volkswagenPrice = (SELECT FLOOR( RAND() * (@maxVehicleValue - @minVehicleValue) + @minVehicleValue));
    
    SET @model = (SELECT IFNULL(MAX(model), 1999) + 1 FROM Vehicle WHERE ManualEntry = 0);
    
    
	INSERT INTO Vehicle (
        Make,
        Model,
        Mileage,
        Colour,
        Location,
        `Value`,
        ManualEntry
    ) 
	VALUES 
	('BMW', @model, @bmwMileage, 'White', 'CT', @bmwPrice, 0), 
	('Volkswagen', @model, @volkswagenMileage, 'Black', 'JHB', @volkswagenPrice, 0);
END //

DELIMITER ;

SET GLOBAL event_scheduler = ON;

DROP EVENT IF EXISTS job_Execute_sp_InsertVehicleBMWAndVolkswagen_Every_20_Minutes;

CREATE EVENT job_Execute_sp_InsertVehicleBMWAndVolkswagen_Every_20_Minutes
ON SCHEDULE EVERY 20 MINUTE
DO CALL sp_InsertVehicleBMWAndVolkswagen;