import {
  getDatabase,
  ref,
  set,
  update,
  get,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyDLy75WqixE5_C734h-oro-FAqq_3jVUfA",
  authDomain: "highscore-e9a68.firebaseapp.com",
  databaseURL:
    "https://highscore-e9a68-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "highscore-e9a68",
  storageBucket: "highscore-e9a68.appspot.com",
  messagingSenderId: "910852326792",
  appId: "1:910852326792:web:553276f167487abe6a263d",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

console.log(database);

let users = [];

let randomNumber;

const computerchoice = ["STEN", "SAX", "PÅSE"];
let ichoose,
  myname,
  computerscore = 0,
  myscore = 0,
  dbobject;
const btn = document.querySelector("button");
const namn = document.querySelector(".myname");
const message = document.querySelector(".computerchoice");
const score = document.querySelector(".myscore");
const text = document.querySelector(".ichoose");
const sten = document.querySelector(".Sten");
const sax = document.querySelector(".Sax");
const påse = document.querySelector(".Påse");
const result = document.querySelector(".result");
const computerscoreDom = document.querySelector(".computerscore");
const resetbtn = document.querySelector(".restart");
const scorelist = document.querySelector(".list");
sten.addEventListener("click", function () {
  ichoose = "STEN";
  console.log(ichoose);
  startGame();
  text.innerHTML = myname + " valde: STEN";
  point();
});

sax.addEventListener("click", function () {
  ichoose = "SAX";
  console.log(ichoose);
  startGame();
  text.innerHTML = myname + " valde: SAX";
  point();
});

påse.addEventListener("click", function () {
  ichoose = "PÅSE";
  console.log(ichoose);
  startGame();
  text.innerHTML = myname + " valde: PÅSE";
  point();
});

btn.addEventListener("click", function () {
  myname = document.querySelector("input").value;
  console.log(document.querySelector("input").value);
  namn.innerHTML = myname;
  event.preventDefault();
});

function startGame() {
  randomNumber = Math.round(Math.random() * 2);
  console.log(computerchoice[randomNumber]);
  message.innerHTML = "Motståndarens val: " + computerchoice[randomNumber];
}

function point() {
  if (ichoose == "STEN" && computerchoice[randomNumber] == "STEN") {
    console.log("LIKA");
  } else if (ichoose == "STEN" && computerchoice[randomNumber] == "SAX") {
    console.log((ichoose = "1 poäng"));
    myscore += 1;
    score.innerHTML = myname + " har " + myscore + " antal poäng";
  } else if (ichoose == "STEN" && computerchoice[randomNumber] == "PÅSE") {
    console.log("Motståndare: 1 poäng");
    computerscore += 1;
    computerscoreDom.innerHTML =
      "Motståndare har " + computerscore + " antal poäng";
  } else if (ichoose == "SAX" && computerchoice[randomNumber] == "SAX") {
    console.log("LIKA");
  } else if (ichoose == "SAX" && computerchoice[randomNumber] == "STEN") {
    console.log("Motståndaren: 1 poäng");
    computerscore += 1;
    computerscoreDom.innerHTML =
      "Motståndare har " + computerscore + " antal poäng";
  } else if (ichoose == "SAX" && computerchoice[randomNumber] == "PÅSE") {
    console.log((ichoose = "1 poäng"));
   myscore+=1;
    
    score.innerHTML = myname + " har " + myscore + " antal poäng";
  } else if (ichoose == "PÅSE" && computerchoice[randomNumber] == "STEN") {
    console.log((ichoose = "1 poäng"));
    myscore += 1;
    score.innerHTML = myname + " har " + myscore + " antal poäng";
  } else if (ichoose == "PÅSE" && computerchoice[randomNumber] == "SAX") {
    console.log("Motståndaren: 1 poäng");
    computerscore += 1;
    computerscoreDom.innerHTML =
      "Motståndare har " + computerscore + " antal poäng";
  } else if (ichoose == "PÅSE" && computerchoice[randomNumber] == "PÅSE") {
    console.log("LIKA");
  }

  setTimeout(win, 200);
}

function win() {
 
  if (computerscore == 1){
    alert("MOTSTÅNDAREN VANN, du fick " + myscore + " poäng");
    writeDB();
    //updateScore();
  

  }
}

resetbtn.addEventListener("click", function () {
  
  readDB();

  myscore = 0;
  text.innerHTML = "jag valde:";
  //   score.innerHTML = myname + " har " + myscore + " antal poäng";
  computerscore = 0;
  message.innerHTML = "motståndare valde:";

  computerscoreDom.innerHTML = "";
  score.innerHTML = "";
  //   computerscoreDom.innerHTML = "Motståndare har " + computerscore + " antal poäng";
});

const baseRef = ref(database, "/highscore");

async function readDB() {
  //   await onValue(
  //     baseRef,
  //    async (snapshot) => {
  //       const data = await snapshot.val();
  //       //dbobject=data;
  //       console.log(data);
  //     },
  //     { once: true }
  //   );

  const snapshot = await get(baseRef);
  dbobject = snapshot.val();

  users = [];
  console.log(dbobject);
  for (const key in dbobject) {
    console.log(key);
    console.log(dbobject[key]);
    users.push(dbobject[key]);
    console.log(dbobject[key].name);
    console.log(dbobject[key].score);
  }

  console.log(users);
  users.sort();
  console.log(users);
  users.sort((a, b) => {
    return b.score - a.score;
  });
}

async function writeDB(params) {
  await push(
    baseRef,

    {
      name: myname,
      score: myscore,
    }
  );
  updateScore();
}

updateScore();

async function updateScore() {
  await readDB();

  if (users.length > 0) {
  console.log("total"+users.length);
  for (let i = 0; i < users.length && i<5; i++) {
    console.log(users[i].name);
    console.log(users[i].score);
    console.log(i);
    scorelist.children[i].innerHTML = users[i].name + ": " + users[i].score;
  }
  
}
}

// scorelist.children
// for (const child of scorelist.children) {
//     console.log(child.tagName);
//   }

alrik(5);

function alrik(x) {
  console.log(x);
}
