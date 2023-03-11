const express = require('express');
const app = express();
const { User } = require('./database/mongo');
const cors = require('cors');
const path = require('path');

app.use(cors({origin: '*'}));

const credentials = require('./routes/credentials')
const home = require('./routes/home');

app.use(express.static(__dirname + '/dist'));
app.set('port', process.env.PORT || 3000);
app.use('/', credentials);
app.use('/', home);

app.get('/', function(req, resp) {
    resp.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(app.get('port'), () => {
    console.log("Http server listening in port: ", app.get('port'));
});
