const functions = {
    create_token
}

function create_token(num = 30) {
    const lower = 'abcdefghijklmnopqrst';
    const upper = lower.toUpperCase();
    const numbers = '0123456789';
    const total = lower + upper + numbers;

    const tam = total.length;
    var token = '';
    for (var i=0; i<num; i++) {
        const ran = Math.floor(Math.random()*(tam - 1));
        token += total[ran];
    }

    return token;
}

module.exports = functions;
