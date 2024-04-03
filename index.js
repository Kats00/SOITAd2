const express = require('express')
const path = require('path');
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(cors());

app.use('/', require('./routes/routes'))
app.use('/assets', express.static(path.join(__dirname, 'music'), {
  extensions: ['mp3']
}));


app.get('/', (req, res) => {
    res.send('Express JS on Vercel')
})

const port = process.env.PORT || 8080

app.listen(port, (err, res) => {
    if (err) {
        console.log(err)
        return res.status(500).send(err.message)
    } else {
        console.log('[INFO] Server Running on port:', port)
    }
})
