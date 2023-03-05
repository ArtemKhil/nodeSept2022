const express = require('express');

const users = require('./dataBase/users.json');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/welcome', (req, res) => {
    res.send('Welcome');
});
app.get('/users', (req, res) => {
    res.status(200).json(users);
})
app.get('/users/:userId', (req, res) => {
    const {userId} = req.params;
    const user = users[+userId];

    res.status(200).json(user);
});
app.post('/users', (req, res) => {
    const body = req.body;
    users.push(body);

    res.status(201).json({message: 'User created'})
});
app.put('/users/:userId', (req, res) => {
    const {userId} = req.params;
    const updatedUser = req.body;

    users[+userId] = updatedUser;
    res.status(200).json({message: 'User updated', data: users[+userId]});
});
app.delete('/users/:userId', (req, res) => {
    const {userId} = req.params;

    users.splice(+userId, 1);
    res.status(200).json({message: 'User deleted'});
});


const PORT = 5100;
app.listen(PORT, () => {
    console.log(`Server listen ${PORT}`);
});
