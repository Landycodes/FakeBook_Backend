const names = [
    'Aaran',
    'Aaren',
    'Aarez',
    'Aarman',
    'Aaron',
    'Aaron-James',
    'Aarron',
    'Aaryan',
    'Aaryn',
    'Aayan',
    'Aazaan',
    'Abaan',
    'Abbas',
    'Abdallah',
    'Abdalroof',
    'Abdihakim',
    'Abdirahman',
    'Abdisalam',
    'Abdul',
    'Abdul-Aziz',
    'Abdulbasir',
    'Abdulkadir',
    'Abdulkarem',
    'Smith',
    'Jones',
    'Coollastname',
    'enter_name_here',
    'Ze',
    'Zechariah',
    'Zeek',
    'Zeeshan',
    'Zeid',
    'Zein',
    'Zen',
    'Zendel',
    'Zenith',
    'Zennon',
    'Zeph',
    'Zerah',
    'Zhen',
    'Zhi',
    'Zhong',
    'Zhuo',
    'Zi',
    'Zidane',
    'Zijie',
    'Zinedine',
    'Zion',
    'Zishan',
    'Ziya',
    'Ziyaan',
    'Zohaib',
    'Zohair',
    'Zoubaeir',
    'Zubair',
    'Zubayr',
    'Zuriel',
    'Xander',
    'Jared',
    'Courtney',
    'Gillian',
    'Clark',
    'Jared',
    'Grace',
    'Kelsey',
    'Tamar',
    'Alex',
    'Mark',
    'Tamar',
    'Farish',
    'Sarah',
    'Nathaniel',
    'Parker',
];
  
const thought = [
    'Bored',
    'im a whore',
    'I like the taste of cat milk',
    'Pooping is just reverse eating',
    'Im the new jeff bezos',
    '7/11 was an inside job',
    'I watched the bee movie today',
    'Hello world!',
    'Stupid Social Media App',
    'I got the job!',
    'why is this person ignoring me',
    'react for a rate 1 to 10',
    'ahoy fakebook!',
    'how much oil do i use?',
    'no lowballs, i know what i got',
    'call me sleepy because im steven',
    'anybody up?',
    'I love my dog but i would not MAKE love to my dog',
];

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

  class randomAccount {
    constructor() {
      this.username = `${random(names)} ${random(names)}`;
      this.email = `${this.username.split(' ')[1]}@email.com`
    }
  }

  const randomThought = () => {
    // let thoughts = [];
    // for(let i = 0; i < int; i++){
    //     thoughts.push(random(thought))
    // }
    return random(thought)
  }

  module.exports = { randomAccount, randomThought }