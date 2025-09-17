CREATE TABLE `account` (
	`id` varchar(36) NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` timestamp,
	`refresh_token_expires_at` timestamp,
	`scope` text,
	`password` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL,
	CONSTRAINT `account_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `oauth_access_token` (
	`id` varchar(36) NOT NULL,
	`access_token` varchar(255),
	`refresh_token` varchar(255),
	`access_token_expires_at` timestamp,
	`refresh_token_expires_at` timestamp,
	`client_id` varchar(36),
	`user_id` varchar(36),
	`scopes` text,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `oauth_access_token_id` PRIMARY KEY(`id`),
	CONSTRAINT `oauth_access_token_access_token_unique` UNIQUE(`access_token`),
	CONSTRAINT `oauth_access_token_refresh_token_unique` UNIQUE(`refresh_token`)
);
--> statement-breakpoint
CREATE TABLE `oauth_application` (
	`id` varchar(36) NOT NULL,
	`name` text,
	`icon` text,
	`metadata` text,
	`client_id` varchar(255),
	`client_secret` text,
	`redirect_ur_ls` text,
	`type` text,
	`disabled` boolean DEFAULT false,
	`user_id` varchar(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `oauth_application_id` PRIMARY KEY(`id`),
	CONSTRAINT `oauth_application_client_id_unique` UNIQUE(`client_id`)
);
--> statement-breakpoint
CREATE TABLE `oauth_consent` (
	`id` varchar(36) NOT NULL,
	`client_id` varchar(36),
	`user_id` varchar(36),
	`scopes` text,
	`created_at` timestamp,
	`updated_at` timestamp,
	`consent_given` boolean,
	CONSTRAINT `oauth_consent_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` varchar(36) NOT NULL,
	`expires_at` timestamp NOT NULL,
	`token` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`user_id` varchar(36) NOT NULL,
	CONSTRAINT `session_id` PRIMARY KEY(`id`),
	CONSTRAINT `session_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(36) NOT NULL,
	`name` text NOT NULL,
	`email` varchar(255) NOT NULL,
	`email_verified` boolean NOT NULL DEFAULT false,
	`image` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	`username` varchar(255),
	`display_username` text,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`),
	CONSTRAINT `user_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE TABLE `verification` (
	`id` varchar(36) NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` timestamp NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `verification_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `account` ADD CONSTRAINT `account_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `oauth_access_token` ADD CONSTRAINT `oauth_access_token_client_id_oauth_application_client_id_fk` FOREIGN KEY (`client_id`) REFERENCES `oauth_application`(`client_id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `oauth_access_token` ADD CONSTRAINT `oauth_access_token_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `oauth_application` ADD CONSTRAINT `oauth_application_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `oauth_consent` ADD CONSTRAINT `oauth_consent_client_id_oauth_application_client_id_fk` FOREIGN KEY (`client_id`) REFERENCES `oauth_application`(`client_id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `oauth_consent` ADD CONSTRAINT `oauth_consent_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;