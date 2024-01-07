const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const register = require('./Controlers/register');
const signin = require('./Controlers/signin');
const profile = require('./Controlers/profile');
const image = require('./Controlers/image');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: "postgres://smart_brain_2nai_user:B6FLovEMfql6eOTGAUsTBIMMUMD449SU@dpg-cmdfojg21fec73d3606g-a/smart_brain_2nai",
    host : 'dpg-cmdfojg21fec73d3606g-a',
    port : 5432,
    user : 'smart_brain_2nai_user',
    password : 'B6FLovEMfql6eOTGAUsTBIMMUMD449SU',
    database : 'smart_brain_2nai',
    ssl: { rejectUnauthorized: false }
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("success");
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)});
app.post('/register',(req, res) => { register.handleRegister(req, res, db, bcrypt)});
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});
app.put('/image', (req, res) => {image.handleImage(req, res, db)});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
}
);