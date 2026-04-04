const mysql = require('mysql2');

// Anslut till MySQL (utan databas)
const connection = mysql.createConnection({
    host: 'localhost',
    database: 'cv',
    user: 'root',
    password: ''
});

connection.connect((err) => {
    if (err) {
        console.error("Kan inte ansluta:", err);
        return;
    }

    console.log("Ansluten till MySQL!");
    
    // Skapa databasen
    connection.query("CREATE DATABASE IF NOT EXISTS cv", (err) => {
        if (err) {
            console.error("Kunde inte skapa databas:", err);
            return;
        }
        console.log("Databas 'cv' skapad!");
        
        // Byt till cv-databasen
        connection.changeUser({database: 'cv'}, (err) => {
            if (err) {
                console.error("Kunde inte byta till cv:", err);
                return;
            }
            
            // Skapa tabellen
            const skapaTabell = `
                CREATE TABLE IF NOT EXISTS courses (
                    ID INT PRIMARY KEY AUTO_INCREMENT,
                    CourseCode VARCHAR(10) NOT NULL,
                    CourseName VARCHAR(100) NOT NULL,
                    Syllabus TEXT NOT NULL,
                    Progression TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )
            `;
            
            connection.query(skapaTabell, (err) => {
                if (err) {
                    console.error("Kunde inte skapa tabell:", err);
                    return;
                }
                console.log("Tabell 'courses' skapad!");
                console.log("Allt klart! Starta servern med: node server.js");
                connection.end();
            });
        });
    });
});