const mongoose = require('mongoose');
const userSchema = require('./schemas/User');
const specialitySchema = require('./schemas/Speciality');
const entrySchema = require('./schemas/Entry');

const dotenv = require('dotenv');
dotenv.config();

const user = process.env.USER;
const password = process.env.PASSWORD;

console.log(user);
console.log(password);

const uri = `mongodb+srv://${user}:${password}@cluster0.wrslwa5.mongodb.net/Health_care?retryWrites=true&w=majority`;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Database connected!"))
.catch(err => console.error(err));

const User = mongoose.model('User', userSchema);
const Speciality = mongoose.model('Speciality', specialitySchema);
const Entry = mongoose.model('Entry', entrySchema);

module.exports = {User, Speciality, Entry};
