const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const port = process.env.SERVER_PORT || 3000;

const bookRoute = require('./routes/book.route');
const categoryRoute = require('./routes/category.route');
const authorRoute = require('./routes/author.route');
const memberRoute = require('./routes/member.route');
const resavationRoute = require('./routes/resavation.route');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Library Management API');
});


app.use("/api/v1/books",bookRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/authors", authorRoute);
app.use("/api/v1/members", memberRoute);
app.use("/api/v1/resavations", resavationRoute);

mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('=== Connected to MongoDB ===');
})
.catch(err => {
    console.error('!!! MongoDB connection error:', err);
});

app.listen(port, () => {
    console.log(`=== App listening at http://localhost:${port} ===`);
});
