create database terra_db;
use terra_db;

CREATE TABLE User
(
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  user_profile_image BLOB NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE Property_type
(
  property_type_id VARCHAR(255) NOT NULL,
  property_type_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (property_type_id)
);

CREATE TABLE PropertySubtype
(
  property_subtype_id VARCHAR(255) NOT NULL,
  property_subtype_name VARCHAR(255) NOT NULL,
  property_type_id VARCHAR(255) NOT NULL,
  PRIMARY KEY (property_subtype_id),
  FOREIGN KEY (property_type_id) REFERENCES Property_type(property_type_id)
);

CREATE TABLE Builder
(
  builder_id VARCHAR(255) NOT NULL,
  builder_name VARCHAR(255) NOT NULL,
  builder_website VARCHAR(255) NOT NULL,
  PRIMARY KEY (builder_id)
);

CREATE TABLE Province
(
  province_id VARCHAR(255) NOT NULL,
  province_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (province_id)
);

CREATE TABLE City
(
  city_id VARCHAR(255) NOT NULL,
  city_name VARCHAR(255) NOT NULL,
  province_id VARCHAR(255) NOT NULL,
  PRIMARY KEY (city_id),
  FOREIGN KEY (province_id) REFERENCES Province(province_id)
);

CREATE TABLE Location
(
  location_id VARCHAR(255) NOT NULL,
  location_name VARCHAR(255) NOT NULL,
  city_id VARCHAR(255) NOT NULL,
  PRIMARY KEY (location_id),
  FOREIGN KEY (city_id) REFERENCES City(city_id)
);

CREATE TABLE Property
(
  purpose VARCHAR(255) NOT NULL,
  price INT NOT NULL,
  on_installment INT NOT NULL,
  installment_rate FLOAT NOT NULL,
  bedrooms INT NOT NULL,
  bathrooms INT NOT NULL,
  area FLOAT NOT NULL,
  property_id VARCHAR(255) NOT NULL,
  property_title VARCHAR(255) NOT NULL,
  date_listed DATE NOT NULL,
  property_description VARCHAR(255) NOT NULL,
  property_history json NOT NULL,
  property_images json NOT NULL,
  longitude FLOAT NOT NULL,
  latitude FLOAT NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  builder_id VARCHAR(255) NOT NULL,
  location_id VARCHAR(255) NOT NULL,
  property_subtype_id VARCHAR(255) NOT NULL,
  PRIMARY KEY (property_id),
  FOREIGN KEY (user_id) REFERENCES User(user_id),
  FOREIGN KEY (builder_id) REFERENCES Builder(builder_id),
  FOREIGN KEY (location_id) REFERENCES Location(location_id),
  FOREIGN KEY (property_subtype_id) REFERENCES PropertySubtype(property_subtype_id)
);