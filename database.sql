-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 26 Des 2019 pada 14.51
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
  `name_category` varchar(25) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
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
  `name_product` varchar(25) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
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
(1, 'Nasi Ayam Rica-Rica', 'Nasi ayam rica-rica dengan Level Kepedasan tingkat dewa', 'https://cdn2.tstatic.net/aceh/foto/bank/images/ilustrasi-ayam-goreng.jpg', 1, 15000, 4),
(2, 'Nasi Ayam Bakar Madu', 'Ayam bakar madu yang manis dan gurih', 'https://cdn2.tstatic.net/aceh/foto/bank/images/ilustrasi-ayam-goreng.jpg', 2, 12000, 4),
(3, 'Nasi Ayam ', 'Ayam bakar madu yang manis dan gurih', 'https://cdn2.tstatic.net/aceh/foto/bank/images/ilustrasi-ayam-goreng.jpg', 2, 10000, 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `products_transactions`
--

CREATE TABLE `products_transactions` (
  `id` int(11) NOT NULL,
  `order_qty` int(11) NOT NULL,
  `price_product` int(11) NOT NULL,
  `sub_total` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `id_transaction` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `date_add` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data untuk tabel `products_transactions`
--

INSERT INTO `products_transactions` (`id`, `order_qty`, `price_product`, `sub_total`, `product_id`, `id_transaction`) VALUES
(1, 3, 15000, 45000, 1, 'MS99502418'),
(2, 3, 15000, 45000, 1, 'MS99502418'),
(3, 3, 15000, 45000, 1, 'MS12434942'),
(4, 3, 15000, 45000, 1, 'MS12434942'),
(5, 3, 15000, 45000, 1, 'MS72462923'),
(6, 3, 15000, 45000, 2, 'MS72462923'),
(7, 3, 15000, 45000, 1, 'MS53364567'),
(8, 3, 15000, 45000, 2, 'MS53364567'),
(9, 3, 15000, 45000, 1, 'MS34946697'),
(10, 3, 15000, 45000, 2, 'MS34946697'),
(11, 1, 12000, 12000, 2, 'MS08154997'),
(12, 1, 15000, 15000, 1, 'MS08154997'),
(13, 1, 15000, 15000, 1, 'MS92927111'),
(14, 1, 12000, 12000, 2, 'MS92927111'),
(15, 1, 15000, 15000, 1, 'MS45229266'),
(16, 1, 12000, 12000, 2, 'MS45229266'),
(17, 1, 12000, 12000, 2, 'MS68591729'),
(18, 1, 12000, 12000, 2, 'MS37031040'),
(19, 1, 12000, 12000, 2, 'MS98809127'),
(20, 3, 15000, 45000, 2, 'MS79710878'),
(21, 3, 15000, 45000, 2, 'MS60716720'),
(22, 1, 12000, 12000, 2, 'MS59379108'),
(23, 1, 12000, 12000, 2, 'MS01017919'),
(24, 1, 12000, 12000, 2, 'MS58753809'),
(25, 1, 12000, 12000, 2, 'MS90852821'),
(26, 1, 12000, 12000, 2, 'MS84186154'),
(27, 1, 12000, 12000, 2, 'MS02503748'),
(28, 1, 12000, 12000, 2, 'MS74334959'),
(29, 1, 12000, 12000, 2, 'MS50675373'),
(30, 1, 12000, 12000, 2, 'MS85231454'),
(31, 1, 12000, 12000, 2, 'MS27169609'),
(32, 1, 12000, 12000, 2, 'MS79632664'),
(33, 1, 15000, 15000, 1, 'MS49693208'),
(34, 1, 12000, 12000, 2, 'MS49693208'),
(35, 1, 12000, 12000, 2, 'MS18641236'),
(36, 1, 15000, 15000, 1, 'MS18641236'),
(37, 4, 12000, 48000, 2, 'MS02057052'),
(38, 4, 15000, 60000, 1, 'MS02057052');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `id_transaction` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `total_transaction` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `date_add` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data untuk tabel `transactions`
--

INSERT INTO `transactions` (`id`, `id_transaction`, `total_transaction`, `id_user`, `date_add`) VALUES
(1, 'MS99502418', 22000, 2, '2019-12-25 07:59:07'),
(2, 'MS12434942', 22000, 2, '2019-12-25 08:01:44'),
(3, 'MS72462923', 22000, 2, '2019-12-25 08:03:42'),
(4, 'MS53364567', 22000, 2, '2019-12-25 08:33:25'),
(5, 'MS26147175', 27000, 2, '2019-12-25 08:34:48'),
(6, 'MS26966173', 27000, 2, '2019-12-25 08:38:04'),
(7, 'MS70212509', 42000, 2, '2019-12-25 08:38:28'),
(8, 'MS61197500', 27000, 2, '2019-12-25 08:40:04'),
(9, 'MS96272823', 42000, 2, '2019-12-25 08:40:28'),
(10, 'MS34946697', 22000, 2, '2019-12-25 08:46:09'),
(11, 'MS07343704', 54000, 2, '2019-12-25 08:46:33'),
(12, 'MS79303986', 54000, 2, '2019-12-25 08:46:54'),
(13, 'MS96098366', 54000, 2, '2019-12-25 08:48:32'),
(14, 'MS84373293', 54000, 2, '2019-12-25 08:48:53'),
(15, 'MS62244029', 27000, 2, '2019-12-25 09:07:53'),
(16, 'MS00536007', 27000, 2, '2019-12-25 09:09:53'),
(17, 'MS18547889', 27000, 2, '2019-12-25 09:11:13'),
(18, 'MS41147884', 27000, 2, '2019-12-25 09:13:11'),
(19, 'MS08154997', 27000, 2, '2019-12-25 09:15:19'),
(20, 'MS92927111', 27000, 2, '2019-12-25 09:17:44'),
(21, 'MS45229266', 27000, 2, '2019-12-25 09:20:14'),
(22, 'MS68591729', 12000, 2, '2019-12-25 09:32:27'),
(23, 'MS37031040', 12000, 2, '2019-12-25 11:52:01'),
(24, 'MS98809127', 12000, 2, '2019-12-25 11:56:02'),
(25, 'MS57609590', 22000, 2, '2019-12-25 11:57:23'),
(26, 'MS79710878', 22000, 2, '2019-12-25 12:00:04'),
(27, 'MS60716720', 22000, 2, '2019-12-25 12:00:55'),
(28, 'MS59379108', 12000, 2, '2019-12-25 12:16:51'),
(29, 'MS01017919', 12000, 2, '2019-12-25 12:18:30'),
(30, 'MS58753809', 12000, 2, '2019-12-25 12:22:35'),
(31, 'MS90852821', 12000, 2, '2019-12-25 12:34:06'),
(32, 'MS84186154', 12000, 2, '2019-12-25 13:15:21'),
(33, 'MS02503748', 12000, 2, '2019-12-25 13:35:49'),
(34, 'MS74334959', 12000, 2, '2019-12-25 13:37:03'),
(35, 'MS50675373', 12000, 2, '2019-12-25 13:40:04'),
(36, 'MS85231454', 12000, 2, '2019-12-25 13:41:14'),
(37, 'MS27169609', 12000, 2, '2019-12-25 13:51:09'),
(38, 'MS79632664', 12000, 2, '2019-12-25 13:53:03'),
(39, 'MS49693208', 27000, 2, '2019-12-25 13:54:07'),
(40, 'MS18641236', 27000, 2, '2019-12-25 14:05:11'),
(41, 'MS79303987', 520000, 1, '2019-11-20 00:48:44'),
(42, 'MS79303922', 220000, 1, '2019-11-13 00:00:00'),
(43, 'MS79303897', 1012000, 1, '2019-10-20 00:48:44'),
(44, 'MS79306789', 956000, 1, '2019-09-20 00:48:44'),
(45, 'MS02057052', 108000, 2, '2019-12-26 09:28:39');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(25) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT untuk tabel `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
