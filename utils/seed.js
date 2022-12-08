const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { randomAccount, randomThought } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    await User.deleteMany({});
    await Thought.deleteMany({});

    const users = [];
    const thoughts = [];

    for(let i = 0; i < 3; i++){
        let newAccount = new randomAccount;
        const username = newAccount.username;
        const email = newAccount.email;
        
        users.push({
            username,
            email,
        })

        thoughts.push({
            thoughtText: randomThought(1),
            username: username
        })
    };

    await User.create(users);
    await Thought.create(thoughts)

    console.table(users);
    console.table(thoughts)
    console.info('Seeding complete! 🌱');
    process.exit(0);
});
