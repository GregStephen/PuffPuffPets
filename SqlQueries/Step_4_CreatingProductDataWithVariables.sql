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
CategoryId,
Price,
QuantityInStock
)
VALUES
('The Chewy Feel Good',
@sellerId,
'https://img.chewy.com/is/image/catalog/134875_MAIN._AC_SL1500_V1503518536_.jpg',
@mediumId,
'CBD specifically made for the one pet everyone should have. Buy these chewables to keep Rover hungry all the time.',
@dogCatId,
739,
31
),

('Rabbit Reefer',
@sellerId,
'https://i1.wp.com/loweringthebar.net/wp-content/uploads/2015/05/eating-rabbit.jpg?w=777&ssl=1',
@vlightId,
'CBD made for swallowing whole. Looks and feels like a real rabbit! Your slithering companion will truly appreciate this delicacy.',
@snakeCatId,
420,
22
),

('Peanut Pills',
@sellerId,
'https://static1.bigstockphoto.com/2/8/1/large2/182163679.jpg',
@lightId,
'CBD crunchy and also swallowable. Polly doesn''t want a cracker, Polly wants Peanut Pills.',
@birdCatId,
200,
7
),

('Miracle Mice',
@sellerId,
'http://www.clker.com/cliparts/m/D/K/t/s/A/green-mouse-hi.png',
@allFuckedOutId,
'CBD that looks and squirms like real mice. Delightful treats for your selfish, self-centered guardian of the underworld.',
@catCatId,
399,
5
),

('Light it up Lettuce',
@sellerId,
'https://www.opposingviews.com/.image/c_fit%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_620/MTUzOTk1NzI4MTI5NzYyMzg2/agents-find-2-tons-of-weed-disguised-as-lettuce-photos-promo-image.jpg',
@heavyId,
'CBD treats that immitate lettuce look, taste, and texture. But has a variety of more interesting effects than lettuce.',
@guineaPigCatId,
550,
28
)

SELECT * FROM Product
