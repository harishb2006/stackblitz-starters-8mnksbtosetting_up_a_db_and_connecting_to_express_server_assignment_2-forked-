const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const { resolve } = require('path');
const User=require('./schema');

const app = express();
const port = 3010;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.static('static'));


app.post('/api/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send('All fields are required');
    }

    const newUser=new User({name,email,password})
    await newUser.save()

    res.status(201).send('User created successfully');
    
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
