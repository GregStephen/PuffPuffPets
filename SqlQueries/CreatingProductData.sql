INSERT INTO Category
([Name])
VALUES
('dogs'),
('cats'),
('birds'),
('snakes'),
('guinea pigs')

SELECT * FROM Category



INSERT INTO [ProductType]
([Type])
VALUES
('very light potency'),
('light potency'),
('medium potency'),
('heavy potency'),
('out of mind potency')

SELECT * FROM [ProductType]



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
'15B9EF64-43FB-4909-A018-52D414AF4DD8',
'https://img.chewy.com/is/image/catalog/134875_MAIN._AC_SL1500_V1503518536_.jpg',
'F03D0B33-2D76-4F67-989D-0CE24985F9AE',
'For all pets -a favorite for dogs',
'916B7FF2-6E08-41D5-9C2D-F13ADB0175E9'
),

('Rabbit Reefer',
'15B9EF64-43FB-4909-A018-52D414AF4DD8',
'https://i1.wp.com/loweringthebar.net/wp-content/uploads/2015/05/eating-rabbit.jpg?w=777&ssl=1',
'CB54AF2E-F485-453E-9A69-6783DFB9109D',
'For snakes',
'7922E28D-78BB-494D-BA2C-2A010B616B86'),

('Peanut Pills',
'15B9EF64-43FB-4909-A018-52D414AF4DD8',
'https://static1.bigstockphoto.com/2/8/1/large2/182163679.jpg',
'3C81D584-5F04-4A98-86CA-8BE668622D49',
'For birds',
'4A47FB53-DE67-43A4-ACF4-561DD837C578'),

('Miracle Mice',
'15B9EF64-43FB-4909-A018-52D414AF4DD8',
'http://www.clker.com/cliparts/m/D/K/t/s/A/green-mouse-hi.png',
'0055721B-46D7-4B87-808B-E3453537EC36',
'For cats',
'23E8106E-0422-4F85-87C5-2206E1B394DF'),

('Light it up Lettuce',
'15B9EF64-43FB-4909-A018-52D414AF4DD8',
'https://www.opposingviews.com/.image/c_fit%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_620/MTUzOTk1NzI4MTI5NzYyMzg2/agents-find-2-tons-of-weed-disguised-as-lettuce-photos-promo-image.jpg',
'D598B25E-E7A7-4B8E-B7A8-F53EBC2C1892',
'For gerbils and guinea pigs',
'05E8535F-66BD-4ABA-933B-FDBB11E3AB7E')

SELECT * FROM Product