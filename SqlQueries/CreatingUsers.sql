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


SELECT * FROM [User]