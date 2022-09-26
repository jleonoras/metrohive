CREATE TABLE "account" (
  "account_id" bigserial PRIMARY KEY NOT NULL,
  "email" text NOT NULL,
  "password" text NOT NULL
);

CREATE TABLE "comment" (
  "comment_id" bigserial PRIMARY KEY NOT NULL,
  "message" text,
  "account_id" bigserial NOT NULL,
  "listing_id" bigserial NOT NULL
);

CREATE TABLE "like" (
  "like_id" bigserial PRIMARY KEY NOT NULL,
  "account_id" bigserial NOT NULL,
  "listing_id" bigserial NOT NULL
);

CREATE TABLE "listing" (
  "listing_id" bigserial PRIMARY KEY NOT NULL,
  "description" text NOT NULL,
  "location" text NOT NULL,
  "price" int NOT NULL,
  "status" text NOT NULL,
  "image1" text NOT NULL,
  "image2" text NOT NULL,
  "image3" text NOT NULL,
  "image4" text,
  "image5" text,
  "featured" boolean,
  "account_id" bigserial NOT NULL
);

CREATE TABLE "user" (
  "user_id" bigserial PRIMARY KEY NOT NULL,
  "fname" text NOT NULL,
  "lname" text NOT NULL,
  "age" int,
  "gender" text,
  "address" text,
  "contact" varchar(11),
  "account_id" bigserial NOT NULL
);

ALTER TABLE "user" ADD FOREIGN KEY ("account_id") REFERENCES "account" ("account_id");

ALTER TABLE "comment" ADD FOREIGN KEY ("account_id") REFERENCES "account" ("account_id");

ALTER TABLE "listing" ADD FOREIGN KEY ("account_id") REFERENCES "account" ("account_id");

ALTER TABLE "like" ADD FOREIGN KEY ("account_id") REFERENCES "account" ("account_id");

ALTER TABLE "comment" ADD FOREIGN KEY ("listing_id") REFERENCES "listing" ("listing_id");

ALTER TABLE "like" ADD FOREIGN KEY ("listing_id") REFERENCES "listing" ("listing_id");
