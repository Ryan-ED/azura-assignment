USE Azura;

DROP TABLE IF EXISTS Vehicle;

CREATE TABLE Vehicle (
	Id INT auto_increment,
    Make TINYTEXT,
    Model TINYTEXT,
    Mileage int,
    Colour TINYTEXT,
    Location TINYTEXT,
    `Value` INT,
    PRIMARY KEY (Id)
);
