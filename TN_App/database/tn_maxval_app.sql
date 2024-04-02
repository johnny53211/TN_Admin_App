-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 02, 2024 at 04:55 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tn_maxval_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance_status`
--

CREATE TABLE `attendance_status` (
  `id` int(100) NOT NULL,
  `attendance_status` varchar(250) NOT NULL,
  `add_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `attendance_status`
--

INSERT INTO `attendance_status` (`id`, `attendance_status`, `add_date`, `update_date`) VALUES
(1, 'WFH', '2024-04-01 10:54:53', NULL),
(2, 'HD', '2024-04-01 10:54:53', NULL),
(3, 'PRESENT', '2024-04-01 10:55:17', NULL),
(4, 'ABSENT', '2024-04-01 10:55:17', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `contact_details`
--

CREATE TABLE `contact_details` (
  `id` int(100) NOT NULL,
  `emp_code` int(100) NOT NULL,
  `conatcts_no` varchar(100) NOT NULL,
  `add_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contact_details`
--

INSERT INTO `contact_details` (`id`, `emp_code`, `conatcts_no`, `add_date`, `update_date`) VALUES
(1, 203, '8870880425', '2024-04-02 06:15:36', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `credential`
--

CREATE TABLE `credential` (
  `id` int(100) NOT NULL,
  `emp_code` int(100) NOT NULL,
  `username` varchar(250) NOT NULL,
  `password` varchar(100) NOT NULL,
  `is_admin` int(11) NOT NULL,
  `add_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `credential`
--

INSERT INTO `credential` (`id`, `emp_code`, `username`, `password`, `is_admin`, `add_date`, `update_date`) VALUES
(1, 203, 'john@gmail.com', '1', 1, '2024-04-01 11:32:39', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `employee_details`
--

CREATE TABLE `employee_details` (
  `id` int(100) NOT NULL,
  `emp_name` varchar(250) NOT NULL,
  `emp_code` int(250) NOT NULL,
  `add_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee_details`
--

INSERT INTO `employee_details` (`id`, `emp_name`, `emp_code`, `add_date`, `update_date`) VALUES
(1, 'Johnson', 203, '2024-04-01 12:02:14', '2024-04-01 12:02:14');

-- --------------------------------------------------------

--
-- Table structure for table `emp_adhar_details`
--

CREATE TABLE `emp_adhar_details` (
  `id` int(100) NOT NULL,
  `emp_code` int(100) NOT NULL,
  `emp_adhar` int(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `emp_adhar_details`
--

INSERT INTO `emp_adhar_details` (`id`, `emp_code`, `emp_adhar`) VALUES
(1, 203, 2147483647);

-- --------------------------------------------------------

--
-- Table structure for table `emp_attendance`
--

CREATE TABLE `emp_attendance` (
  `id` int(100) NOT NULL,
  `emp_code` int(100) NOT NULL,
  `day` int(100) NOT NULL,
  `month` int(100) NOT NULL,
  `year` int(100) NOT NULL,
  `attendance_status` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `emp_attendance`
--

INSERT INTO `emp_attendance` (`id`, `emp_code`, `day`, `month`, `year`, `attendance_status`) VALUES
(1, 203, 21, 1, 2024, 1),
(2, 203, 22, 1, 2024, 4),
(3, 203, 10, 2, 2024, 2),
(7, 203, 10, 2, 2024, 2);

-- --------------------------------------------------------

--
-- Table structure for table `emp_personal_details`
--

CREATE TABLE `emp_personal_details` (
  `id` int(100) NOT NULL,
  `emp_code` int(100) NOT NULL,
  `father_name` varchar(100) NOT NULL,
  `mother_name` varchar(100) NOT NULL,
  `gender` int(100) NOT NULL,
  `designation` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `date_of_joining` varchar(100) NOT NULL,
  `blood_group` varchar(100) NOT NULL,
  `date_of_birth` varchar(100) NOT NULL,
  `team` int(100) NOT NULL,
  `mail_id` varchar(250) NOT NULL,
  `add_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `emp_personal_details`
--

INSERT INTO `emp_personal_details` (`id`, `emp_code`, `father_name`, `mother_name`, `gender`, `designation`, `address`, `date_of_joining`, `blood_group`, `date_of_birth`, `team`, `mail_id`, `add_date`, `update_date`) VALUES
(1, 203, 'Rajamani M', 'Sasikala R', 1, 'Software Developer', '1/34 North Street Keelathathapparai Tuticorin 628001', '02/05/2022', 'A-ve', '02/03/2001', 3, 'johnson02032001@gmail.com', '2024-04-02 06:15:29', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(250) NOT NULL,
  `event_name` varchar(100) NOT NULL,
  `event_date` varchar(100) NOT NULL,
  `add_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `food_preference`
--

CREATE TABLE `food_preference` (
  `id` int(100) NOT NULL,
  `emp_code` int(100) NOT NULL,
  `food_type` int(100) NOT NULL,
  `no_members` int(100) NOT NULL,
  `event_name` varchar(100) NOT NULL,
  `attend` int(11) NOT NULL,
  `add_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `gender`
--

CREATE TABLE `gender` (
  `id` int(100) NOT NULL,
  `gender_type` varchar(250) NOT NULL,
  `add_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `gender`
--

INSERT INTO `gender` (`id`, `gender_type`, `add_date`, `update_date`) VALUES
(1, 'Male', '2024-04-01 09:45:21', NULL),
(2, 'Female', '2024-04-01 09:45:21', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `maritial_status`
--

CREATE TABLE `maritial_status` (
  `id` int(100) NOT NULL,
  `maritial_status` varchar(250) NOT NULL,
  `add_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `maritial_status`
--

INSERT INTO `maritial_status` (`id`, `maritial_status`, `add_date`, `update_date`) VALUES
(1, 'SINGLE', '2024-04-01 12:17:39', NULL),
(2, 'MARRIED\r\n', '2024-04-01 12:17:39', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `office_assets`
--

CREATE TABLE `office_assets` (
  `id` int(100) NOT NULL,
  `assets_name` varchar(250) NOT NULL,
  `add_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

CREATE TABLE `team` (
  `id` int(100) NOT NULL,
  `team_name` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`id`, `team_name`) VALUES
(1, 'VECTRE'),
(2, 'MAXVAL'),
(3, 'BUILDTRACK');

-- --------------------------------------------------------

--
-- Table structure for table `yes_no_table`
--

CREATE TABLE `yes_no_table` (
  `id` int(100) NOT NULL,
  `response_type` varchar(250) NOT NULL,
  `add_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `yes_no_table`
--

INSERT INTO `yes_no_table` (`id`, `response_type`, `add_date`, `update_date`) VALUES
(1, 'Yes', '2024-04-02 14:34:09', NULL),
(2, 'No', '2024-04-02 14:34:09', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance_status`
--
ALTER TABLE `attendance_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_details`
--
ALTER TABLE `contact_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `conatct_no` (`conatcts_no`),
  ADD UNIQUE KEY `emp_code_contact` (`emp_code`) USING BTREE;

--
-- Indexes for table `credential`
--
ALTER TABLE `credential`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee_details`
--
ALTER TABLE `employee_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `emp_code` (`emp_code`);

--
-- Indexes for table `emp_adhar_details`
--
ALTER TABLE `emp_adhar_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `emp_code` (`emp_code`);

--
-- Indexes for table `emp_attendance`
--
ALTER TABLE `emp_attendance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `emp_code_attendance` (`emp_code`),
  ADD KEY `emp_attendance_status` (`attendance_status`);

--
-- Indexes for table `emp_personal_details`
--
ALTER TABLE `emp_personal_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `emp_code_personal` (`emp_code`) USING BTREE,
  ADD KEY `emp_gender_personal` (`gender`),
  ADD KEY `emp_team` (`team`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `food_preference`
--
ALTER TABLE `food_preference`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gender`
--
ALTER TABLE `gender`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `maritial_status`
--
ALTER TABLE `maritial_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `office_assets`
--
ALTER TABLE `office_assets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `yes_no_table`
--
ALTER TABLE `yes_no_table`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance_status`
--
ALTER TABLE `attendance_status`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `contact_details`
--
ALTER TABLE `contact_details`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `credential`
--
ALTER TABLE `credential`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `employee_details`
--
ALTER TABLE `employee_details`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `emp_adhar_details`
--
ALTER TABLE `emp_adhar_details`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `emp_attendance`
--
ALTER TABLE `emp_attendance`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `emp_personal_details`
--
ALTER TABLE `emp_personal_details`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `food_preference`
--
ALTER TABLE `food_preference`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gender`
--
ALTER TABLE `gender`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `maritial_status`
--
ALTER TABLE `maritial_status`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `office_assets`
--
ALTER TABLE `office_assets`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `team`
--
ALTER TABLE `team`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `yes_no_table`
--
ALTER TABLE `yes_no_table`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `emp_attendance`
--
ALTER TABLE `emp_attendance`
  ADD CONSTRAINT `emp_attendance_status` FOREIGN KEY (`attendance_status`) REFERENCES `attendance_status` (`id`),
  ADD CONSTRAINT `emp_code_attendance` FOREIGN KEY (`emp_code`) REFERENCES `employee_details` (`emp_code`);

--
-- Constraints for table `emp_personal_details`
--
ALTER TABLE `emp_personal_details`
  ADD CONSTRAINT `emp_code_personal` FOREIGN KEY (`emp_code`) REFERENCES `employee_details` (`emp_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `emp_gender_personal` FOREIGN KEY (`gender`) REFERENCES `gender` (`id`),
  ADD CONSTRAINT `emp_team` FOREIGN KEY (`team`) REFERENCES `team` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
