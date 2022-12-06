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

    for(let i = 0; i < 10; i++){
        let newAccount = new randomAccount;
        const username = newAccount.username;
        const email = newAccount.email;
        
        users.push({
            username,
            email,
        })

        thoughts.push({
            thoughtText: randomThought(1),
            username: username.split(' ')[0]
        })
    };

    await User.create(users);
    await Thought.create(thoughts)

    console.table(users);
    console.table(thoughts)
    console.info('Seeding complete! 🌱');
    process.exit(0);
})

//VIRTUAL IS CREATED USING ROUTE POST BUT NOT WHEN USING SEEDS
/*EXAMPLE FROM POST API/USERS 
   SEND {
"username": "Andrew Landry",
	"email": "landry@email.com"
}
RETRIEVED
{
	"username": "Andrew Landry",
	"email": "landry@email.com",
	"thoughts": [],
	"friends": [],
	"_id": "638f13ba809a36f73942390b",
	"__v": 0
}*/
//EXAMPLE FROM SEED
/* 	{
		"thoughts": [],
		"friends": [],
		"_id": "638f0a78b445d2140f18afe4",
		"username": "Aaron Zerah",
		"email": "Zerah@email.com"
	}*/