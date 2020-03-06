let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();
app.use(cors());

app.use('/api', bodyParser.json(), router);
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let students = [{ 'id': '5935512010', 'name': 'Pimwipa', 'surname': 'Sakunkham', 'Major': 'CoE', 'GPA': 4.00 },
{ 'id': '5935512005', 'name': 'Nattawat', 'surname': 'Songsom', 'Major': 'CoE', 'GPA': 4.00 }];

router.route('/students')
    .get((req, res) => res.json(students))

    .post((req, res) => {
        let student = {
            id: req.body.id,
            name: req.body.name,
            surname: req.body.surname,
            Major: req.body.Major,
            GPA: req.body.GPA
        }
        students.push(student);
        res.json({ message: 'Created!' })
    })


router.route('/students/:student_id')
    .get((req, res) => {
        let index = students.findIndex((item) => {
            return item.id == req.params.student_id
        })
        res.json(students[index])
    })

    .put((req, res) => {

        let index = students.findIndex((item) => {
            return item.id == req.params.student_id
        })

        students[index].name = req.body.name;
        students[index].surname = req.body.surname;
        students[index].Major = req.body.Major;
        students[index].GPA = req.body.GPA;
        res.json({ message: 'student updated!' + req.params.student_id });
    })

    .delete((req, res) => {
        let index = students.findIndex((item) => {
            return item.id == req.params.student_id
        })

        students.splice(index, 1)
        res.json({ message: 'student deleted: ' + req.params.student_id });
    })



app.use("*", (req, res) => res.status(404).send('404 Not found'));
app.listen(8000, () => console.log("Server is running"));
