const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const inbound = require('./routes/api/inbound');
const outbound = require('./routes/api/outbound');


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Use Routes
app.use('/api/inbound', inbound);
app.use('/api/outbound', outbound);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));