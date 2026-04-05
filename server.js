const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000

// Importera databaskopplingen
const db = require('./db');

app.set('view engine', 'ejs');
app.set('views', './public/views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Array för kurser (behålls för kompatibilitet)
const courseList = [
    {
        courseCode: '123456',
        courseName: 'Kurs 1',
        syllabus: 'Syllabus 1',
        progression: 'Progression 1'
    }
];

// Startsida – visa kurser
app.get('/', (req, res) => {
    db.query("SELECT * FROM courses", (err, resultat) => {
        if (err) {
            console.log("Databasfel:", err);
            return res.render('startpage', { courseList: [] });
        }
        res.render('startpage', { courseList: resultat });
    });
})

// VISA KURSER - hämtar från databasen
app.get('/startpage', (req, res) => {
    db.query("SELECT * FROM courses", (err, resultat) => {
        if (err) {
            console.log("Databasfel:", err);
            return res.render('startpage', { courseList: [] });
        }
        res.render('startpage', { courseList: resultat });
    });
})

// Visa formulär för att lägga till kurs
app.get('/addcourse', (req, res) => {
    res.render('addcourse', { 
        errors: [], 
        newCourseCode: '', 
        newCourseName: '', 
        newSyllabus: '', 
        newProgression: '' 
    });
});

// SPARA NY KURS
app.post('/addcourse', (req, res) => {
    // Läs in formulärdata
    let newCourseCode = req.body.courseCode;
    let newCourseName = req.body.courseName;
    let newSyllabus = req.body.syllabus;
    let newProgression = req.body.progression;

    let errors = [];

    // Validering
    if (newCourseCode === '' || newCourseName === '' || newSyllabus === '' || newProgression === '') {
        errors.push('Alla fält måste fyllas i');
    }

    if (/[!@#$%^&*()]/.test(newCourseCode) || /[!@#$%^&*()]/.test(newCourseName)) {
        errors.push('Kurskod och kursnamn får inte innehålla specialtecken');
    }

    if (newProgression !== 'A' && newProgression !== 'B') {
        errors.push('Kursprogression måste vara A eller B');
    }

    // Om valideringsfel, visa formuläret igen
    if (errors.length > 0) {
        return res.render('addcourse', { 
            errors,
            newCourseCode,
            newCourseName,
            newSyllabus,
            newProgression
        });
    }

    // Spara i databasen
    const insertQuery = "INSERT INTO courses (CourseCode, CourseName, Syllabus, Progression) VALUES (?, ?, ?, ?)";
    
    db.query(insertQuery, [newCourseCode, newCourseName, newSyllabus, newProgression], (err, result) => {
        if (err) {
            console.error("Kunde inte spara kursen i databasen:", err);
            errors.push('Tekniskt fel: Kunde inte spara kursen');
            
            return res.render('addcourse', { 
                errors,
                newCourseCode,
                newCourseName,
                newSyllabus,
                newProgression
            });
        }
        
        // Spara även i arrayen
        courseList.push({
            courseCode: newCourseCode,
            courseName: newCourseName,
            syllabus: newSyllabus,
            progression: newProgression
        });

        // Visa tomt formulär
        res.render('addcourse', { 
            errors: [], 
            newCourseCode: "", 
            newCourseName: "", 
            newSyllabus: "", 
            newProgression: "" 
        });
    });
});

app.listen(port, () => {
  console.log(`Servern körs på http://localhost:${port}`);
})

// radera kurs från tabell och databas
app.get('/delete/:id', (req, res) => {
    const kursId = req.params.id;
    
    db.query("DELETE FROM courses WHERE ID = ?", [kursId], (err) => {
        if (err) {
            console.log("Kunde inte radera:", err);
        }
        res.redirect('/startpage');
    });
})


// Om-sidan
app.get('/about', (req, res) => {
    res.render('about')
})