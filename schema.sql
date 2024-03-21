CREATE TABLE transactions(
  id serial PRIMARY KEY,
  symbol text NOT NULL,
  units int NOT NULL,
  purchasePrice float NOT NULL,
  purchaseTimestamp timestamp DEFAULT now()
);
