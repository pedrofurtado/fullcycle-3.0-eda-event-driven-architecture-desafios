CREATE DATABASE IF NOT EXISTS wallet;
CREATE DATABASE IF NOT EXISTS balance;

-- WALLETCORE

USE wallet;

CREATE TABLE IF NOT EXISTS `clients` (
  `id` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `created_at` date DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS `accounts` (
  `id` varchar(255) DEFAULT NULL,
  `client_id` varchar(255) DEFAULT NULL,
  `balance` float DEFAULT NULL,
  `created_at` date DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS `transactions` (
  `id` varchar(255) DEFAULT NULL,
  `account_id_from` varchar(255) DEFAULT NULL,
  `account_id_to` varchar(255) DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `created_at` date DEFAULT NULL
);

INSERT INTO `clients` (id, name, email, created_at) VALUES
('afaeb71b-2afa-4cd0-887f-204cbc6e74ab', 'John Doe', 'john@j.com', '2023-05-31'),
('66150901-87f7-4fd0-bb6c-95849809ab89', 'Jane Jean', 'jane@j.com', '2023-05-31'),
('b4f7b0d5-01a1-4486-95ba-1ade097682ca', 'Chukwuebuka Robertina', 'chukwuebuka@r.com', '2023-05-31'),
('2cb1d96b-7c60-475a-8325-36133fca1dc4', 'Thandiwe Lutgardis', 'thandiwe@l.com', '2023-05-31');

INSERT INTO `accounts` (id, client_id, balance, created_at) VALUES
('a2a95023-9798-4ad8-9ad8-b0385e029254', 'afaeb71b-2afa-4cd0-887f-204cbc6e74ab', 640, '2023-05-31'),
('92b877fb-adb6-4dc6-ad30-c77c3472ad60', '66150901-87f7-4fd0-bb6c-95849809ab89', 360, '2023-05-31'),
('a617c5a6-9aae-4f31-8b44-207860fd9273', 'b4f7b0d5-01a1-4486-95ba-1ade097682ca', 1000, '2023-05-31'),
('86895cab-3beb-4d14-bef1-fa22de9b3c9e', '2cb1d96b-7c60-475a-8325-36133fca1dc4', 1000, '2023-05-31');

INSERT INTO `transactions` (id, account_id_from, account_id_to, amount, created_at) VALUES
('c711aeb0-f63c-46b8-84d6-74375b7d19cf', 'a2a95023-9798-4ad8-9ad8-b0385e029254', '92b877fb-adb6-4dc6-ad30-c77c3472ad60', 360, '2023-06-05');

-- BALANCE-MS

USE balance;

CREATE TABLE IF NOT EXISTS `balance` (
  `id` varchar(255) DEFAULT NULL,
  `account_id` varchar(255) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL
);

INSERT INTO `balance` (id, account_id, amount) VALUES
('a5f8d78b-c9fa-4bb7-b7e4-cfc819039e5b', 'a2a95023-9798-4ad8-9ad8-b0385e029254', 640),
('bfdecab8-9037-4490-9895-3dc8679e34d5', '92b877fb-adb6-4dc6-ad30-c77c3472ad60', 360);
