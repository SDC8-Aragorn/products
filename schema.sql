USE DATABASE products

CREATE TABLE product (
  id INTEGER PRIMARY KEY,
  name VARCHAR(50),
  slogan VARCHAR(300),
  description VARCHAR (2000),
  category VARCHAR (50),
  default_price INTEGER
);

CREATE TABLE photos (
  id INTEGER PRIMARY KEY,
  styleId INTEGER,
  url TEXT,
  thumbnail_url TEXT
);

CREATE TABLE features (
  id INTEGER,
  product_id INTEGER,
  feature VARCHAR (100),
  value VARCHAR (100)
);

CREATE TABLE related (
  id INTEGER,
  current_product_id INTEGER,
  related_product_id INTEGER
);

CREATE TABLE skus (
  id INTEGER,
  styleId INTEGER,
  size VARCHAR(9),
  quantity INTEGER
);