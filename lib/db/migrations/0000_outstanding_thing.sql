CREATE TABLE `participants` (
	`id` varchar(191) NOT NULL,
	`visitorId` varchar(256) NOT NULL,
	`data` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT now(),
	`updated_at` timestamp NOT NULL DEFAULT now(),
	CONSTRAINT `participants_id` PRIMARY KEY(`id`)
);
