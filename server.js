const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')
const fetch = require('node-fetch');

const register = require('./Controlers/register');
const signin = require('./Controlers/signin');
const profile = require('./Controlers/profile');
const image = require('./Controlers/image');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    host : process.env.DATABASE_HOST,
    port : 5432,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PW,
    database : process.env.DATABASE_DB,
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


app.post('/clarifai', async (req, res) => {
  try {
    const { imageUrl } = req.body;

    const clarifaiResponse = await fetch('https://api.clarifai.com/v2/models/face-detection/outputs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Key your_clarifai_api_key', // Replace with your actual Clarifai API key
      },
      body: JSON.stringify({
        "user_app_id": {
          "user_id": "nachador",
          "app_id": "test",
        },
        "inputs": [
          {
            "data": {
              "image": {
                "url": imageUrl,
              }
            }
          }
        ]
      }),
    });

    const clarifaiData = await clarifaiResponse.json();
    res.json(clarifaiData);
  } catch (error) {
    console.error('Clarifai API call failed', error);
    res.status(400).json('Clarifai API call failed');
  }
});



const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
}
);