const usersDB = {
    users: require('../models/user.model'),
    setUsers: function (data) { this.users = data }
}
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const fsPromises = require('fs').promises;
const path = require('path');

exports.handleLogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
    const foundUser = usersDB.users.find(user => user.username === username);
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        console.log("user and pass are a match")
        // const roles = Object.values(foundUser.roles);
        // // create JWTs
        // const accessToken = jwt.sign(
        //     {
        //         "UserInfo": {
        //             "username": foundUser.username
        //         }
        //     },
        //     process.env.ACCESS_TOKEN_SECRET,
        //     { expiresIn: '30s' }
        // );
        // const refreshToken = jwt.sign(
        //     { "username": foundUser.username },
        //     process.env.REFRESH_TOKEN_SECRET,
        //     { expiresIn: '1d' }
        //);
        // Saving refreshToken with current user
        const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
        const currentUser = { ...foundUser, refreshToken };
        usersDB.setUsers([...otherUsers, currentUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'user.model'),
            JSON.stringify(usersDB.users)
        );
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        //res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}