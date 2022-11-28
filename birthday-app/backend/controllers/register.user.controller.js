const User = require('../models/user.model');
const bcrypt = require('bcrypt');

exports.register_new_user = async (req, res) => {
    console.log(`Username passad from client to server ${req.username}`)
    const { username, userEmail, password } = req.body;
    if (!username || !userEmail || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

    // check for duplicate usernames in the db
    const duplicateUser = await User.findOne({ username: username }).exec();
    const duplicateEmail = await User.findOne({ userEmail: userEmail }).exec();
    if (duplicateUser || duplicateEmail) return res.sendStatus(409); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        //create and store the new user
        const result = await User.create({
            "username": username,
            "userEmail": userEmail,
            "password": hashedPwd
        });

        console.log(result);

        res.status(201).json({ 'success': `New user ${username} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
 }