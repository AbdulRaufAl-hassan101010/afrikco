-- DROP DATABASE ghantrade;
-- CREATE DATABASE ghantrade;
-- use ghantrade;


-- Start a transaction
START TRANSACTION;

    -- Add Customer Role
    -- Add Admin Role
    INSERT INTO roles (role_id, name, created_at, updated_at)
    VALUES (1, 'Customer', NOW(), NOW()),
    (2, 'Admin', NOW(), NOW());


    -- Add order status
    INSERT INTO order_status (order_status_id, name, created_at, updated_at)
    VALUES (1, 'pending', NOW(), NOW()),
    (2, 'accepted', NOW(), NOW()),
    (3, 'delivered', NOW(), NOW());

    -- Add Random Product Categories
    INSERT INTO categories (cat_id, name, created_at, updated_at)
    VALUES (1, 'Electronics', NOW(), NOW()),
        (2, 'Clothing', NOW(), NOW()),
        (3, 'Home & Garden', NOW(), NOW()),
        (4, 'Toys & Games', NOW(), NOW()),
        (5, 'Books', NOW(), NOW());

    INSERT INTO users (user_id, username, email, password_hash, role_id, created_at, updated_at)
    VALUES
        (1, 'user1', 'user1@example.com', 'password1_hash', 1, NOW(), NOW()),
        (2, 'user2', 'user2@example.com', 'password2_hash', 1, NOW(), NOW()),
        (3, 'user3', 'user3@example.com', 'password3_hash', 1, NOW(), NOW()),
        (4, 'user4', 'user4@example.com', 'password4_hash', 1, NOW(), NOW()),
        (5, 'user5', 'user5@example.com', 'password5_hash', 1, NOW(), NOW());




    -- Add Random Products
    INSERT INTO products (name, description, price, image_url, quantity, category_id, created_at, updated_at, rating)
    VALUES
        ('Smartphone', 'A high-end smartphone with advanced features.', 699.99, 'image1.jpg', 50, 1, NOW(), NOW(), 0),
        ('Laptop', 'A powerful laptop for productivity and gaming.', 1299.99, 'image2.jpg', 30, 1, NOW(), NOW(), 0),
        ('LED TV', 'A 55-inch LED TV with 4K resolution.', 899.99, 'image3.jpg', 20, 1, NOW(), NOW(), 4.0),
        ('Running Shoes', 'High-quality running shoes for athletes.', 79.99, 'image4.jpg', 100, 2, NOW(), NOW(), 1),
        ('Cookware Set', 'A complete set of non-stick cookware.', 199.99, 'image5.jpg', 10, 3, NOW(), NOW(), 4),
        ('Board Game', 'A fun board game for family entertainment.', 29.99, 'image6.jpg', 50, 4, NOW(), NOW(), 0),
        ('Bestseller Novel', 'A bestselling novel by a renowned author.', 14.99, 'image7.jpg', 75, 5, NOW(), NOW(), 1);

    -- Add Random Ratings
    INSERT INTO ratings (product_id, user_id, score, created_at, updated_at, comment)
    VALUES (1, 1, 5, NOW(), NOW(), 'Great product!'),
        (2, 2, 4, NOW(), NOW(), 'I love it!'),
        (3, 3, 4, NOW(), NOW(), 'Highly recommended.'),
        (4, 4, 3, NOW(), NOW(), 'Not what I expected.'),
        (5, 5, 5, NOW(), NOW(), 'Awesome quality.'),
        (6, 5, 5, NOW(), NOW(), 'Terrible customer service.'),
        (5, 5, 5, NOW(), NOW(), 'Good value for the price.');



-- Commit the transaction if all statements succeeded
COMMIT;

-- If any statement failed, roll back the entire transaction
-- ROLLBACK;