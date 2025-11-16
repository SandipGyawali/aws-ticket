CREATE TYPE "public"."food_preference" AS ENUM('Veg', 'NonVeg');--> statement-breakpoint
CREATE TYPE "public"."session_choice" AS ENUM('Conference', 'Workshop');--> statement-breakpoint
CREATE TABLE "aws-ticket-user" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" text NOT NULL,
	"password" text,
	"access_token" text,
	"refresh_token" text,
	"create_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "aws-ticket-user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "aws-ticket-attendees" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"food_preference" text,
	"session_choice" text,
	"checked_in" boolean DEFAULT false NOT NULL,
	"check_in_time" timestamp,
	"lunch" boolean DEFAULT false,
	"lunch2" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "aws-ticket-attendees_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "aws-ticket-session" (
	"session_id" uuid PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL,
	"room" text,
	"capacity" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "aws-ticket-user_session" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"session_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "aws-ticket-user_session" ADD CONSTRAINT "aws-ticket-user_session_user_id_aws-ticket-user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."aws-ticket-user"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "aws-ticket-user_session" ADD CONSTRAINT "aws-ticket-user_session_session_id_aws-ticket-session_session_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."aws-ticket-session"("session_id") ON DELETE cascade ON UPDATE no action;