-- DROP DATABASE ghantrade;
-- CREATE DATABASE ghantrade;
use ghantrade;


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

    INSERT INTO users (user_id, username, email, password_hash, role_id, created_at, updated_at, verified)
    VALUES
        (6, 'admin', 'abdulraufalhassan101010@gmail.com', 'password5_hash', 2, NOW(), NOW(), 1);




    -- Add Random Products
    INSERT INTO products (name, description, price, image_url, quantity, category_id, created_at, updated_at, rating)
    VALUES
        ('Iphone 15', 'A high-end smartphone with advanced features.', 999.99, 'https://th.bing.com/th?id=OIP.N6NyOed_v0AjftW_9MlmFgHaK4&w=206&h=302&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2', 50, 1, NOW(), NOW(), 0),
        ('Hp Laptop', 'A powerful laptop for productivity and gaming.', 1299.99, 'https://th.bing.com/th/id/OIP.PqWwWMuCBDHQUizOYsVEBQHaF4?w=231&h=183&c=7&r=0&o=5&pid=1.7', 30, 1, NOW(), NOW(), 0),
        ('Nasco tv', 'A 55-inch LED TV with 4K resolution.', 899.99, 'https://th.bing.com/th/id/OIP.CN69v2hegkmmGaak6xtakQHaFO?w=254&h=180&c=7&r=0&o=5&pid=1.7', 20, 1, NOW(), NOW(), 0),
        ('Nike shoes', 'High-quality running shoes for athletes.', 79.99, 'https://th.bing.com/th/id/OIP.7SeMY3g9G_4NuDeEHBz8DgHaE3?w=219&h=180&c=7&r=0&o=5&pid=1.7', 100, 2, NOW(), NOW(), 0),
        ('Cookware Set', 'A complete set of non-stick cookware.', 199.99, 'https://th.bing.com/th/id/OIP.sUWm0Apm4NN3uE2o92_jLQHaGc?w=227&h=197&c=7&r=0&o=5&pid=1.7', 10, 3, NOW(), NOW(), 0),
        ('Board Game', 'A fun board game for family entertainment.', 29.99, 'https://th.bing.com/th/id/OIP.rIi3WaZhFXsDw8bxkLUh3AHaE7?w=291&h=193&c=7&r=0&o=5&pid=1.7', 50, 4, NOW(), NOW(), 0),
        ('Golden age', 'A bestselling novel by a renowned author.', 14.99, 'https://th.bing.com/th?id=OIP.MkyClab8iObaHFKsC6RgTQHaEK&w=333&h=187&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2', 75, 5, NOW(), NOW(), 0);

    -- -- Add Random Ratings
    -- INSERT INTO ratings (product_id, user_id, score, created_at, updated_at, comment)
    -- VALUES (1, 1, 5, NOW(), NOW(), 'Great product!'),
    --     (2, 2, 4, NOW(), NOW(), 'I love it!'),
    --     (3, 3, 4, NOW(), NOW(), 'Highly recommended.'),
    --     (4, 4, 3, NOW(), NOW(), 'Not what I expected.'),
    --     (5, 5, 5, NOW(), NOW(), 'Awesome quality.'),
    --     (6, 5, 5, NOW(), NOW(), 'Terrible customer service.'),
    --     (5, 5, 5, NOW(), NOW(), 'Good value for the price.');



-- Commit the transaction if all statements succeeded
COMMIT;

-- If any statement failed, roll back the entire transaction
-- ROLLBACK;