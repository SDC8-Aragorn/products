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
  id INTEGER,
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

CREATE TABLE styles (
  id INTEGER,
  productId INTEGER,
  name VARCHAR(50),
  sale_price INTEGER,
  original_price INTEGER,
  default_style INTEGER
);

CREATE INDEX style ON styles (
  id,
  productId,
  name,
  original_price,
  sale_price,
  default_style
);

CREATE INDEX photo ON photos (
  styleId
);

CREATE INDEX sku ON skus (
  id,
  styleId,
  size,
  quantity
);

CREATE INDEX relateds ON related (
  id,
  current_product_id,
  related_product_id
);