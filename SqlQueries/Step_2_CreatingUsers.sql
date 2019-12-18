DECLARE @user1 UNIQUEIDENTIFIER
DECLARE @user2 UNIQUEIDENTIFIER
DECLARE @user3 UNIQUEIDENTIFIER

INSERT INTO [User]
([UserName],
[FirstName],
[LastName],
[IsSeller],
[DateCreated],
[FirebaseUid])
VALUES
('ACasey98',
'Austin',
'Casey',
0,
'20190508 12:35:23 AM',
'jcNLJFsyBRNQQVnygu96IATq0bX2'),
('CalvinDaMogul',
'Calvin',
'Foster',
0,
'20191010 04:20:10 AM',
'RRwPHELUs3RPrRsrMZ1WqWyZ1Lr2')

INSERT INTO [User]
([UserName],
[FirstName],
[LastName],
[IsSeller],
[DateCreated],
[FirebaseUid],
[BusinessName])
VALUES
('MullinAround',
'David',
'Mullins',
1,
'20190609 06:06:06 AM',
'aLiD4fZ1fOVeo7E1mncBXwd6dgg2',
'Lets Fuck Up Pets Inc.')

SELECT @user1 = [Id]
FROM [User]
WHERE FirstName = 'Austin'

SELECT @user2 = [Id]
FROM [User]
WHERE FirstName = 'Calvin'

SELECT @user3 = [Id]
FROM [User] results
WHERE FirstName = 'David'

INSERT INTO [UserAddress]
([UserId],
[IsPreferred],
[AddressLine1],
[City],
[State],
[ZipCode])
VALUES
(@user1,
1,
'123 Fake Street',
'Nashville',
'TN',
'37213'),
(@user1,
0,
'321 Real Street',
'New York City',
'NY',
'81234'),
(@user2,
1,
'420 High Avenue',
'Antioch',
'TN',
'37013'),
(@user3,
1,
'6969 Freek Street',
'McMinnville',
'TN',
'37110')

SELECT * FROM [User]
SELECT * FROM [UserAddress]