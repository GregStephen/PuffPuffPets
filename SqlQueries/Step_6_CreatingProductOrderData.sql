DECLARE @userId1 UNIQUEIDENTIFIER
DECLARE @userId2 UNIQUEIDENTIFIER

DECLARE @ProductId1 UNIQUEIDENTIFIER
DECLARE @ProductId2 UNIQUEIDENTIFIER
DECLARE @ProductId3 UNIQUEIDENTIFIER
DECLARE @ProductId4 UNIQUEIDENTIFIER

DECLARE @OrderId1 UNIQUEIDENTIFIER
DECLARE @OrderId2 UNIQUEIDENTIFIER

SELECT *
INTO #tempUser
FROM [User]

SELECT @userId1 = [Id]
FROM #tempUser results
WHERE FirstName = 'Austin'

SELECT @userId2 = [Id]
FROM #tempUser results
WHERE FirstName = 'Calvin'

SELECT *
INTO #tempProduct
FROM [Product]

SELECT @ProductId1 = [Id]
FROM #tempProduct results
WHERE Title = 'Rabbit Reefer'

SELECT @ProductId2 = [Id]
FROM #tempProduct results
WHERE Title = 'Light it up Lettuce'

SELECT @ProductId3 = [Id]
FROM #tempProduct results
WHERE Title = 'The Chewy Feel Good'

SELECT @ProductId4 = [Id]
FROM #tempProduct results
WHERE Title = 'Peanut Pills'

SELECT *
INTO #tempOrder
FROM [Order]

SELECT @OrderId1 = [Id]
FROM #tempOrder results
WHERE userId = @userId1

SELECT @OrderId2 = [Id]
FROM #tempOrder results
WHERE userId = @userId2

INSERT INTO ProductOrder
(ProductId,
 OrderId,
 QuantityOrdered,
 IsShipped,
 ShippedDate)
VALUES
(@ProductId1,
 @OrderId1,
 1,
 0,
 NULL),
 (@ProductId4,
 @OrderId1,
 1,
 0,
 NULL),
(@ProductId2,
 @OrderId2,
 1,
 1,
 '20191111 04:20:10 AM'),
(@ProductId3,
 @OrderId2,
 1,
 1,
 '20191111 04:20:10 AM')

 SELECT *
 FROM ProductOrder
