-- Start a transaction
START TRANSACTION;

-- Add Customer Role
-- Add Admin Role
INSERT INTO roles (id, name)
VALUES (1, 'Customer'),
VALUES (2, 'Admin');

-- Add Random Product Categories
INSERT INTO categories (id, name)
VALUES (1, 'Electronics'),
       (2, 'Clothing'),
       (3, 'Home & Garden'),
       (4, 'Toys & Games'),
       (5, 'Books');

-- Add Random Ratings
INSERT INTO ratings (product_id, user_id, rating)
VALUES (1, 1, 5),
       (2, 2, 4),
       (3, 3, 4),
       (4, 4, 3),
       (5, 5, 5);

-- Add Random Products
INSERT INTO products (name, description, price, image_url, quantity, category_id)
VALUES
    ('Smartphone', 'A high-end smartphone with advanced features.', 699.99, 'image1.jpg', 50, 1),
    ('Laptop', 'A powerful laptop for productivity and gaming.', 1299.99, 'image2.jpg', 30, 1),
    ('LED TV', 'A 55-inch LED TV with 4K resolution.', 899.99, 'image3.jpg', 20, 1),
    ('Running Shoes', 'High-quality running shoes for athletes.', 79.99, 'image4.jpg', 100, 2),
    ('Cookware Set', 'A complete set of non-stick cookware.', 199.99, 'image5.jpg', 10, 3),
    ('Board Game', 'A fun board game for family entertainment.', 29.99, 'image6.jpg', 50, 4),
    ('Bestseller Novel', 'A bestselling novel by a renowned author.', 14.99, 'image7.jpg', 75, 5);


-- Add Random Comments
INSERT INTO comments (text, product_id)
VALUES
    ('Great product!', 1),
    ('I love it!', 2),
    ('Highly recommended.', 3),
    ('Not what I expected.', 4),
    ('Awesome quality.', 5),
    ('Terrible customer service.', 6),
    ('Good value for the price.', 7);


-- Commit the transaction if all statements succeeded
COMMIT;

-- If any statement failed, roll back the entire transaction
-- ROLLBACK;