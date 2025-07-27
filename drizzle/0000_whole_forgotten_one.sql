CREATE TABLE "NoteTablle" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"title" text NOT NULL,
	"subtitle" text,
	"createdAt" timestamp DEFAULT now(),
	"description" text NOT NULL,
	"tags" text NOT NULL
);
