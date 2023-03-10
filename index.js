const express = require('express');
const app = express();
const { User } = require('./database/mongo');
const cors = require('cors');

cors({
    origin: '*'
});

const credentials = require('./routes/credentials')
const home = require('./routes/home');

app.set('port', process.env.PORT || 3000);
app.use('/', credentials);
app.use('/', home);

app.listen(app.get('port'), () => {
    console.log("Http server listening in port: ", app.get('port'));
});
