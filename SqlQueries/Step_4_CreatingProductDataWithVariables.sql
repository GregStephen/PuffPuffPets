DECLARE @dogCatId UNIQUEIDENTIFIER
DECLARE @catCatId UNIQUEIDENTIFIER
DECLARE @birdCatId UNIQUEIDENTIFIER
DECLARE @snakeCatId UNIQUEIDENTIFIER
DECLARE @guineaPigCatId UNIQUEIDENTIFIER
DECLARE @vlightId UNIQUEIDENTIFIER
DECLARE @lightId UNIQUEIDENTIFIER
DECLARE @mediumId UNIQUEIDENTIFIER
DECLARE @heavyId UNIQUEIDENTIFIER
DECLARE @allFuckedOutId UNIQUEIDENTIFIER
DECLARE @sellerId UNIQUEIDENTIFIER

INSERT INTO Category
([Name])
VALUES
('Dogs'),
('Cats'),
('Birds'),
('Snakes'),
('Guinea Pigs')

SELECT * FROM Category

INSERT INTO [ProductType]
([Type])
VALUES
('Very Light Potency'),
('Light Potency'),
('Medium Potency'),
('Heavy Potency'),
('Out of Mind Potency')

SELECT * 
INTO #tempCat
FROM [Category]

SELECT @dogCatId = [Id]
FROM #tempCat results
WHERE [Name] = 'Dogs'

SELECT @catCatId = [Id]
FROM #tempCat results
WHERE [Name] = 'Cats'

SELECT @birdCatId = [Id]
FROM #tempCat results
WHERE [Name] = 'Birds'

SELECT @snakeCatId = [Id]
FROM #tempCat results
WHERE [Name] = 'Snakes'

SELECT @guineaPigCatId = [Id]
FROM #tempCat results
WHERE [Name] = 'Guinea Pigs'

SELECT * 
INTO #tempTypes
FROM [ProductType]

SELECT @vlightId = [Id]
FROM #tempTypes results
WHERE [Type] = 'Very Light Potency'

SELECT @lightId = [Id]
FROM #tempTypes results
WHERE [Type] = 'Light Potency'

SELECT @mediumId = [Id]
FROM #tempTypes results
WHERE [Type] = 'Medium Potency'

SELECT @heavyId = [Id]
FROM #tempTypes results
WHERE [Type] = 'Heavy Potency'

SELECT @allFuckedOutId = [Id]
FROM #tempTypes results
WHERE [Type] = 'Out of Mind Potency'

SELECT TOP(1) [Id] AS sellerId
INTO #tempSeller
FROM [User]
WHERE [IsSeller] = 1

SELECT @sellerId = sellerId
FROM #tempSeller results

SELECT * FROM [ProductType]
SELECT * FROM [User]



INSERT INTO Product
(Title,
SellerId,
ImgUrl,
TypeId,
[Description],
CategoryId
)
VALUES
('The Chewy Feel Good',
@sellerId,
'https://img.chewy.com/is/image/catalog/134875_MAIN._AC_SL1500_V1503518536_.jpg',
@mediumId,
'For all pets -a favorite for dogs',
@dogCatId
),

('Rabbit Reefer',
@sellerId,
'https://i1.wp.com/loweringthebar.net/wp-content/uploads/2015/05/eating-rabbit.jpg?w=777&ssl=1',
@vlightId,
'For snakes',
@snakeCatId),

('Peanut Pills',
@sellerId,
'https://static1.bigstockphoto.com/2/8/1/large2/182163679.jpg',
@lightId,
'For birds',
@birdCatId),

('Miracle Mice',
@sellerId,
'http://www.clker.com/cliparts/m/D/K/t/s/A/green-mouse-hi.png',
@allFuckedOutId,
'For cats',
@catCatId),

('Light it up Lettuce',
@sellerId,
'https://www.opposingviews.com/.image/c_fit%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_620/MTUzOTk1NzI4MTI5NzYyMzg2/agents-find-2-tons-of-weed-disguised-as-lettuce-photos-promo-image.jpg',
@heavyId,
'For gerbils and guinea pigs',
@guineaPigCatId)

SELECT * FROM Product

