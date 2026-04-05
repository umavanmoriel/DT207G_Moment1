 # Lösnings
- Jag har byggt en webbapplikation i Node.js med Express som låter användare hantera sina lästa kurser.
- Applikationen använder MySQL som databas och EJS som template engine för att dynamiskt generera webbsidor.
- MySQL används för att lagra kursinformation i en tabell som heter "courses".
- Tabellen innehåller kolumner ID, CourseCode, CourseName, Syllabus, Progression, created_at och updated_at.
- Webbplatsen har tre sidor: startsida som visar alla kurser, lägg till kurs-sida med formulär för nya kurser och om-sida med information om webbplatsen.

## ER-diagram
- [ER-diagram](er-diagram.drawio.svg)

## Installation och körning

### 1) Klona repo
- git clone https://github.com/umavanmoriel/DT207G_Moment1.git
- cd DT207G_Moment1

### 2) Installera beroenden
npm install express mysql2 ejs

### 3) Installera databasen
- Starta MySQL i XAMPP
- Öppna http://localhost/phpmyadmin i webbläsaren
- Klicka på "Importera" i toppmenyn
- Klicka på "Välj fil" och välj [`databas.sql`](./databas.sql)
- Klicka på "Kör" längst ner

### 4) Starta servern
node server.js

### 5) Öppna webbapplikationen
Gå till: `http://localhost:3000`
