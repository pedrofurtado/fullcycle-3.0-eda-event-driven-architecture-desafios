-- Create clients table
CREATE TABLE clients (id VARCHAR(255), name VARCHAR(255), email VARCHAR(255), created_at DATE);

-- Create accounts table
CREATE TABLE accounts (id VARCHAR(255), client_id VARCHAR(255), balance FLOAT, created_at DATE);

-- Create transactions table
CREATE TABLE transactions(id VARCHAR(255), account_id_from VARCHAR(255), account_id_to VARCHAR(255), amount FLOAT, created_at DATE);

-- Update balance to create transaction. IMPORTANT: Change the id according to values in the database
update accounts set balance=100 where id="d683df34-178d-4d87-98b7-bd7c52a9ab02";