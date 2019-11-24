DECLARE @userId1 UNIQUEIDENTIFIER
DECLARE @userId2 UNIQUEIDENTIFIER
DECLARE @paymentTypeId1 UNIQUEIDENTIFIER
DECLARE @paymentTypeId2 UNIQUEIDENTIFIER

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
INTO #tempPaymentType
FROM PaymentType

SELECT TOP(1) @paymentTypeId1 = [Id]
FROM #tempPaymentType results
WHERE [UserId] = @userId1

SELECT TOP(1) @paymentTypeId2 = [Id]
FROM #tempPaymentType results
WHERE [UserId] = @userId2


INSERT INTO [Order]
([UserId],
 [PaymentTypeId],
 [TotalPrice],
 [IsCompleted],
 [PurchaseDate])
VALUES
(@userId1,
 @paymentTypeId1,
 0,
 0,
 NULL),
 (@userId2,
 @paymentTypeId2,
 0,
 1,
 '20191111 04:20:10 AM')

 SELECT * FROM [Order]