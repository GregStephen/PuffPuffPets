DECLARE @user1 UNIQUEIDENTIFIER
DECLARE @user2 UNIQUEIDENTIFIER
DECLARE @user3 UNIQUEIDENTIFIER

INSERT INTO [User]
([UserName],
[FirstName],
[LastName],
[Email],
[IsSeller],
[DateCreated],
[Password])
VALUES
('ACasey98',
'Austin',
'Casey',
'AustinCasey420@hotmail.com',
0,
'20190508 12:35:23 AM',
'HeyMyNameIsAustin123'),
('CalvinDaMogul',
'Calvin',
'Foster',
'cal.j.foster@gmail.com',
0,
'20191010 04:20:10 AM',
'HeyMyNameIsCalvin123')

INSERT INTO [User]
([UserName],
[FirstName],
[LastName],
[Email],
[IsSeller],
[DateCreated],
[Password],
[BusinessName])
VALUES
('MullinAround',
'David',
'Mullins',
'DavidTheDestroyer@hotmail.com',
1,
'20190609 06:06:06 AM',
'HeyMyNameIsDavid123',
'Lets Fuck Up Pets Inc.')

SELECT *
INTO #tempUser
FROM [User]

SELECT @user1 = [Id]
FROM #tempUser results
WHERE FirstName = 'Austin'

SELECT @user2 = [Id]
FROM #tempUser results
WHERE FirstName = 'Calvin'

SELECT @user3 = [Id]
FROM #tempUser results
WHERE FirstName = 'David'

INSERT INTO [UserAddress]
([UserId],
[Preferred],
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