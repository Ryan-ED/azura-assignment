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
      IsManualEntry
  )
	VALUES 
	('BMW', @model, @bmwMileage, 'White', 'CT', @bmwPrice, 0), 
	('Volkswagen', @model, @volkswagenMileage, 'Black', 'JHB', @volkswagenPrice, 0);
END //

DELIMITER ;