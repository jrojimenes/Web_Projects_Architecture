-- DELETE ALL ROWS
DELETE FROM users;

DROP table links;

--Create new user

CREATE USER 'user'@'localhost' IDENTIFIED BY 'psw';
