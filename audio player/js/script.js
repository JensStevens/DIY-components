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
    cover: "../assets/img/IYRTITL.jpg",
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
    cover: "../assets/img/IYRTITL.jpg",
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

rewind.addEventListener("click", function () {
  if (currentSong > 0) {
    currentSong--;
  } else {
    currentSong = song.length - 1;
  }
  audio.src = song[currentSong].url;
  cover.style.backgroundImage = `url(${song[currentSong].cover})`;
  audio.play();
  play.style.backgroundImage = "url(../assets/img/pause.png)";
  play.style.width = "45px";
  play.style.height = "45px";
});

forward.addEventListener("click", function () {
  if (currentSong < song.length - 1) {
    currentSong++;
  } else {
    currentSong = 0;
  }
  audio.src = song[currentSong].url;
  cover.style.backgroundImage = `url(${song[currentSong].cover})`;
  audio.play();
  play.style.backgroundImage = "url(../assets/img/pause.png)";
  play.style.width = "45px";
  play.style.height = "45px";
});

play.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
    play.style.backgroundImage = "url(../assets/img/pause.png)";
    play.style.width = "45px";
    play.style.height = "45px";
  } else {
    audio.pause();
    play.style.backgroundImage = "url(../assets/img/play.png)";
    play.style.width = "48px";
    play.style.height = "48px";
  }
});

audio.src = song[currentSong].url;
cover.style.backgroundImage = `url(${song[currentSong].cover})`;

// drag import

dragElement(document.getElementById("audio-player"));

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "controls")) {
    // if present, the controls is where you move the DIV from:
    document.getElementById(elmnt.id + "controls").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
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
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
