const { User } = require('./database/mongo');
const functions = {
    create_token,
    validate_session
}

function create_token(num = 30) {
    const lower = 'abcdefghijklmnopqrst';
    const upper = lower.toUpperCase();
    const numbers = '0123456789';
    const total = lower + upper + numbers;

    const tam = total.length;
    var token = '';
    for (var i = 0; i < num; i++) {
        const ran = Math.floor(Math.random()*(tam - 1));
        token += total[ran];
    }

    return token;
}

async function validate_session(req, resp, next) {
    const session = req.body.mysession ? req.body.mysession : req.query.mysession;
    const cc = req.body.mycc ? req.body.mycc : req.query.mycc;
    const role = req.body.myrole ? req.body.myrole : req.query.myrole;

    console.log(cc);
    const found = await User.findOne({sessions: session, cc, role}).exec();

    if (found == null) {
        const msg = 'Invalid session key...';
        console.log(msg);
        resp.status(404).send({msg});
        return;
    }

    next();
}

module.exports = functions;
