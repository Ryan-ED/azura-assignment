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
