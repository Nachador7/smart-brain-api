const express = require('express');

const app = express();

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date(),
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date(),
        }   
    ]
}

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.post('/signin', (req, res) => {
  
    res.json('signing in');
});
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
}
);