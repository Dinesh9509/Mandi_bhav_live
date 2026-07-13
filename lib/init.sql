
-- Create MandiList table
CREATE TABLE IF NOT EXISTS MandiList (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  mandiName VARCHAR(255) NOT NULL,
  address VARCHAR(255),
  district VARCHAR(255),
  state VARCHAR(255),
  category VARCHAR(255),
  cropIdList VARCHAR(255),
  hashMapData TEXT,
  addedDate VARCHAR(255),
  apmc_name_eng TEXT UNIQUE,
  apmc_name_hin TEXT
);

-- Create CommodityList table
CREATE TABLE IF NOT EXISTS CommodityList (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  commodity_name_eng TEXT UNIQUE,
  commodity_name_hin TEXT
);

-- Create commodity table
CREATE TABLE IF NOT EXISTS commodity (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  apmc_name TEXT,
  category TEXT,
  commodity_name TEXT,
  commodity_uom TEXT,
  latest_transaction_date TEXT,
  max_price TEXT,
  min_price TEXT,
  modal_price TEXT,
  total_arrival_qty TEXT,
  total_sold_qty TEXT,
  commodity_name_hindi TEXT,
  apmc_hindiName TEXT
);

-- -- Create Apmc_names_data table
CREATE TABLE IF NOT EXISTS Apmc_names_data (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  apmc_name_eng VARCHAR(255) NOT NULL UNIQUE,
  apmc_name_hin VARCHAR(255)
);


