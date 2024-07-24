const exports =require('express');
const app = express();
const PORT =process.env.PORT||3072;
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
const c = require('./routes/c');
const updateDelete = require('./routes/ud');



app.use('/c', cRead);
app.use('/ud', updateDelete);

app.use('/', function (req, res, next) {
    res.sendStatus(404);
});

app.listen(PORT, () =>
    console.log('Server running on port: ' + PORT)
);