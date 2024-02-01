const song = [
  {
    title: "Days Before Rodeo/The Prayer",
    artist: "Travis Scott",
    url: "../assets/audio/ThePrayer.mp3",
    cover: "../assets/img/dbr.jpg",
  },
  {
    title: "Backyard",
    artist: "Travis Scott",
    url: "../assets/audio/Backyard.mp3",
    cover: "../assets/img/dbr.jpg",
  },
  {
    title: "6 God",
    artist: "Drake",
    url: "../assets/audio/6God.mp3",
    cover: "../assets/img/ifyou.png",
  },
  {
    title: "FML (O.G. Version Feat. The Weeknd, Bon Iver & Travis Scott)",
    artist: "Kanye West",
    url: "../assets/audio/FML-OG.mp3",
    cover: "../assets/img/kanye.jpg",
  },
  {
    title: "Days In The East",
    artist: "Drake",
    url: "../assets/audio/DaysInTheEast.mp3",
    cover: "../assets/img/daysITE.jpeg",
  },
  {
    title: "Drugs You Should Try",
    artist: "Travis Scott",
    url: "../assets/audio/DrugsYouShouldTry.mp3",
    cover: "../assets/img/dbr.jpg",
  },
];

const rewind = document.querySelector("#rwd");
const play = document.querySelector("#play");
const forward = document.querySelector("#fwd");
const audio = document.getElementsByTagName("audio")[0];
const cover = document.querySelector("#audio-player");

let currentSong = 0;

function changeSong() {
  audio.src = song[currentSong].url;
  cover.style.backgroundImage = `url(${song[currentSong].cover})`;
  audio.play();
  play.style.backgroundImage = "url(../assets/img/pause.png)";
  play.style.scale = "1.1";
  play.classList.add("playing");
  play.classList.remove("pause");
}

rewind.addEventListener("click", function () {
  if (currentSong > 0) {
    currentSong--;
  } else {
    currentSong = song.length - 1;
  }
  changeSong();
});

forward.addEventListener("click", function () {
  if (currentSong < song.length - 1) {
    currentSong++;
  } else {
    currentSong = 0;
  }
  changeSong();
});

play.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
    play.style.backgroundImage = "url(../assets/img/pause.png)";
    play.style.scale = "1.3";
    play.classList.add("playing");
    play.classList.remove("pause");
  } else {
    audio.pause();
    play.style.backgroundImage = "url(../assets/img/play.png)";
    play.style.scale = "1";
    play.classList.remove("playing");
    play.classList.add("pause");
  }
});

audio.src = song[currentSong].url;
cover.style.backgroundImage = `url(${song[currentSong].cover})`;

// // ----------------------shuffle function

const shuffle = document.querySelector("#shuffle");

function shuffleSong(songArray) {
  for (let i = songArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [songArray[i], songArray[j]] = [songArray[j], songArray[i]];
  }
}

shuffle.addEventListener("click", function () {
  shuffleSong(song);
  currentSong = 0; // Reset to the first song after shuffling
  changeSong();
  if (shuffle.classList.contains("playing")) {
    shuffle.classList.remove("playing");
  } else {
    shuffle.classList.add("playing");
  }
});

// ----------------------drag import

dragElement(document.getElementById("audio-player"));

function dragElement(player) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(player.id + "controls")) {
    // if present, the controls is where you move the DIV from:
    document.getElementById(player.id + "controls").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    player.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    player.style.top = player.offsetTop - pos2 + "px";
    player.style.left = player.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
