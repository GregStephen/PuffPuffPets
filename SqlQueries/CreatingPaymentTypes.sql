-- FIRST in dbo.PaymentType, right click on AccountNumer and select 'Modify' 
-- Change the name to 'AccountNumber' and the type to 'bigint'. 
-- Save and then refresh
-- THEN run this code

INSERT INTO [PaymentType]
([UserId],
[AccountNumber],
[Type])
VALUES
('37D62BBD-FC95-428F-A49D-A3C157CA76F6',
3333444455543434,
'Visa'),
('37D62BBD-FC95-428F-A49D-A3C157CA76F6',
1111222233334321,
'PayPal'),
('DB195FB5-6227-4E69-84D2-CFB35FE4B032',
1234567898765432,
'Visa')

SELECT * FROM [PaymentType]