-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 20 Des 2019 pada 08.47
-- Versi server: 8.0.13-4
-- Versi PHP: 7.2.24-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wt0AlCTQpt`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name_category` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `date_add` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_update` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data untuk tabel `categories`
--

INSERT INTO `categories` (`id`, `name_category`) VALUES
(1, 'Promo'),
(2, 'Recomended'),
(3, 'Menu Utama'),
(7, 'Menu Paling Laku'),
(15, 'Roti Lapis Wuenak');

-- --------------------------------------------------------

--
-- Struktur dari tabel `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name_product` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `desc_product` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `image_product` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `id_category` int(11) NOT NULL,
  `price_product` int(11) NOT NULL,
  `quantity_product` int(5) NOT NULL,
  `date_add` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data untuk tabel `products`
--

INSERT INTO `products` (`id`, `name_product`, `desc_product`, `image_product`, `id_category`, `price_product`, `quantity_product`) VALUES
(1, 'Nasi Ayam Rica-Rica', 'Nasi ayam rica-rica dengan Level Kepedasan tingkat dewa', 'https://cdn2.tstatic.net/aceh/foto/bank/images/ilustrasi-ayam-goreng.jpg', 1, 15000, 3),
(2, 'Nasi Ayam Bakar Madu', 'Ayam bakar madu yang manis dan gurih', 'https://cdn2.tstatic.net/aceh/foto/bank/images/ilustrasi-ayam-goreng.jpg', 2, 12000, 20),
(3, 'Nasi Ayam ', 'Ayam bakar madu yang manis dan gurih', 'https://cdn2.tstatic.net/aceh/foto/bank/images/ilustrasi-ayam-goreng.jpg', 2, 10000, 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `products_transactions`
--

CREATE TABLE `products_transactions` (
  `id` int(11) NOT NULL,
  `order_qty` int(11) NOT NULL,
  `price_product` int(11) NOT NULL,
  `subtotal_product` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `id_transaction` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `date_add` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data untuk tabel `products_transactions`
--

INSERT INTO `products_transactions` (`id`, `order_qty`, `price_product`, `subtotal_product`, `id_product`, `id_transaction`) VALUES
(4, 10, 12000, 120000, 1, 'MS35086840'),
(5, 10, 12000, 120000, 1, 'MS58992108'),
(6, 10, 12000, 120000, 1, 'MS59244259'),
(7, 12, 12000, 120000, 1, 'MS90886336'),
(8, 12, 15000, 120000, 1, 'MS72329884');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transactions`
--

CREATE TABLE `transactions` (
  `id` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `total_transaction` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `date_add` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data untuk tabel `transactions`
--

INSERT INTO `transactions` (`id`, `total_transaction`, `id_user`, `date_add`) VALUES
('MS35086840', 12000, 1, '2019-11-29 15:54:49'),
('MS58992108', 12000, 1, '2019-11-29 16:01:27'),
('MS59244259', 12000, 1, '2019-11-29 16:02:14'),
('MS72329884', 12000, 1, '2019-11-29 18:03:21'),
('MS90886336', 12000, 1, '2019-11-29 17:59:41');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `date_add` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `fullname`, `username`, `email`, `password`) VALUES
(1, 'Nitha Huwaida', 'nithahuwaida', 'nithahuwaida@gmail.com', '$2b$10$rtGfgFyBiQUR4AvgCC4G8eQtARvSYPto9BqT6kPiQzE5MVQPiHrXK'),
(2, 'Bae Bhun', 'Baebhunie', 'baebhunie@gmail.com', '$2b$10$8xmeczSgoyqqkkKoKR/Rau1XF6wE59p4KO0p2QkZ7Oh8AZipf3SDW');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `products_transactions`
--
ALTER TABLE `products_transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT untuk tabel `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `products_transactions`
--
ALTER TABLE `products_transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
