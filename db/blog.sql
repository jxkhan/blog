CREATE DATABASE BLOG;
USE BLOG;

CREATE TABLE Posts (
id INT PRIMARY KEY AUTO_INCREMENT,
author_id INT NOT NULL,
title VARCHAR(100) NOT NULL,
content LONGTEXT NOT NULL,
created_at TIMESTAMP NOT NULL,
image_path VARCHAR(50)


);

CREATE TABLE Author (
id INT PRIMARY KEY,
name VARCHAR(50) NOT NULL,
bio TEXT NOT NULL

);

ALTER TABLE posts
ADD CONSTRAINT fk_author_id
FOREIGN KEY (author_id) REFERENCES author (id);

ALTER TABLE posts
DROP CONSTRAINT fk_constraint_name;

INSERT INTO author (id, name, bio) VALUES ('1', 'junaid', 'writer');

SELECT * FROM blog.author;

RENAME TABLE author TO Author;
RENAME TABLE post TO Posts;

ALTER TABLE authors RENAME TO Author;
ALTER TABLE posts RENAME TO Posts;




