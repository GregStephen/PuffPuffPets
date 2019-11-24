-- FIRST in dbo.PaymentType, right click on AccountNumer and select 'Modify' 
-- Change the name to 'AccountNumber' and the type to 'nvarchar(25)'. 
-- Save and then refresh
-- THEN run the code

DECLARE @user1 UNIQUEIDENTIFIER
DECLARE @user2 UNIQUEIDENTIFIER

SELECT TOP(1) [Id] AS user1
INTO #temp
FROM [User]
WHERE [IsSeller] = 0
ORDER BY [Id] ASC

SELECT TOP(1) [Id] AS user2
INTO #temp2
FROM [User]
WHERE [IsSeller] = 0
ORDER BY [Id] DESC

SELECT @user1 = user1
FROM #temp results

SELECT @user2 = user2
FROM #temp2 results


 -- drop table #temp
 -- drop table #temp2

INSERT INTO [PaymentType]
([UserId],
[AccountNumber],
[Type])
VALUES
(@user1,
'3333444455543434',
'Visa'),
(@user1,
'1111222233334321',
'PayPal'),
(@user2,
'1234567898765432',
'Visa')

SELECT * FROM [PaymentType]