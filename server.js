const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000

// Importera databaskopplingen
const db = require('./db');

app.set('view engine', 'ejs');
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