/*CREATE DATABASE [PuffPuffPets]*/


IF not exists (SELECT * FROM sys.tables WHERE [name] = 'User')
	BEGIN
	CREATE TABLE [User]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[UserName] NVARCHAR(255) not null,
		[FirstName] NVARCHAR(255) not null,
		[LastName] NVARCHAR(255) not null,
		[Email] NVARCHAR(255) not null,
		[IsSeller] Bit not null,
		[DateCreated] DateTime not null,
		[Password] NVARCHAR(255) not null,
		[BusinessName] NVARCHAR(255) null
	)
	END
ELSE
	PRINT 'User table already exists'
	

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'Product')
	BEGIN
	CREATE TABLE [Product]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[Title] NVARCHAR(255) not null,
		[SellerId] UNIQUEIDENTIFIER not null,
		[ImgUrl] NVARCHAR(max) not null,
		[TypeId] UNIQUEIDENTIFIER not null,
		[Description] NVARCHAR(255) not null,
		[CategoryId] UNIQUEIDENTIFIER not null,
		[Price] BIGINT not null DEFAULT (0),
		[QuantityInStock] INT not null DEFAULT (0)
	)
	END
ELSE
	PRINT 'Product table already exists'

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'ProductType')
	BEGIN
	CREATE TABLE [ProductType]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[Type] NVARCHAR(255) not null
	)
	END
ELSE
	PRINT 'ProductType table already exists'

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'Category')
	BEGIN
	CREATE TABLE [Category]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[Name] NVARCHAR(255) not null,
	)
	END
ELSE
	PRINT 'Category table already exists'

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'UserAddress')
	BEGIN
	CREATE TABLE [UserAddress]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[UserId] UNIQUEIDENTIFIER not null,
		[IsPreferred] BIT not null,
		[AddressLine1] NVARCHAR(255) not null,
		[AddressLine2] NVARCHAR(255) null,
		[City] NVARCHAR(255) not null,
		[State] NVARCHAR(255) not null,
		[ZipCode] NVARCHAR(255) not null
	)
	END
ELSE
	PRINT 'UserAddress table already exists'

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'ProductOrder')
	BEGIN
	CREATE TABLE [ProductOrder]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[ProductId] UNIQUEIDENTIFIER not null,
		[OrderId] UNIQUEIDENTIFIER not null,
		[QuantityOrdered] Int not null,
		[IsShipped] Bit not null,
		[ShippedDate] DateTime null
	)
	END
ELSE
	PRINT 'ProductOrder table already exists'

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'Order')
	BEGIN
	CREATE TABLE [Order]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[UserId] UNIQUEIDENTIFIER not null,
		[PaymentTypeId] UNIQUEIDENTIFIER null,
		[TotalPrice] Int not null DEFAULT(0),
		[IsCompleted] Bit not null,
		[PurchaseDate] DateTime null
	)
	END
ELSE
	PRINT 'Order table already exists'

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'PaymentType')
	BEGIN
	CREATE TABLE [PaymentType]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[UserId] UNIQUEIDENTIFIER not null,
		[AccountNumber] NVARCHAR(25) not null,
		[Type] NVARCHAR(255) not null
	)
	END
ELSE
	PRINT 'PaymentType table already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_Product_User')
	BEGIN
	ALTER TABLE [Product]
	ADD CONSTRAINT FK_Product_User
		FOREIGN KEY (SellerId) 
		REFERENCES [User] (Id)
	END
ELSE
	PRINT 'Foreign key FK_Product_User already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_Product_Type')
	BEGIN
	ALTER TABLE [Product]
	ADD CONSTRAINT FK_Product_Type
		FOREIGN KEY (TypeId) 
		REFERENCES [ProductType] (Id)
	END
ELSE
	PRINT 'Foreign key FK_Product_Type already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_Product_Category')
	BEGIN
	ALTER TABLE [Product]
	ADD CONSTRAINT FK_Product_Category
		FOREIGN KEY (CategoryId) 
		REFERENCES [Category] (Id)
	END
ELSE
	PRINT 'Foreign key FK_Product_Category already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_UserAddress_User')
	BEGIN
	ALTER TABLE [UserAddress]
	ADD CONSTRAINT FK_UserAddress_User
		FOREIGN KEY (UserId) 
		REFERENCES [User] (Id)
	END
ELSE
	PRINT 'Foreign key FK_UserAddress_User already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_PaymentType_User')
	BEGIN
	ALTER TABLE [PaymentType]
	ADD CONSTRAINT FK_PaymentType_User
		FOREIGN KEY (UserId) 
		REFERENCES [User] (Id)
	END
ELSE
	PRINT 'Foreign key FK_PaymentType_User already exists'

	IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_ProductOrder_Product')
	BEGIN
	ALTER TABLE [ProductOrder]
	ADD CONSTRAINT FK_ProductOrder_Product
		FOREIGN KEY (ProductId) 
		REFERENCES [Product] (Id)
	END
ELSE
	PRINT 'Foreign key FK_ProductOrder_Product already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_ProductOrder_Order')
	BEGIN
	ALTER TABLE [ProductOrder]
	ADD CONSTRAINT FK_ProductOrder_Order
		FOREIGN KEY (OrderId) 
		REFERENCES [Order] (Id)
	END
ELSE
	PRINT 'Foreign key FK_ProductOrder_Order already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_Order_User')
	BEGIN
	ALTER TABLE [Order]
	ADD CONSTRAINT FK_Order_User
		FOREIGN KEY (UserId) 
		REFERENCES [User] (Id)
	END
ELSE
	PRINT 'Foreign key FK_Order_User already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_Order_PaymentType')
	BEGIN
	ALTER TABLE [Order]
	ADD CONSTRAINT FK_Order_PaymentType
		FOREIGN KEY (PaymentTypeId) 
		REFERENCES [PaymentType] (Id)
	END
ELSE
	PRINT 'Foreign key FK_Order_PaymentType already exists'