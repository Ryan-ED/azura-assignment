USE Azura;

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
