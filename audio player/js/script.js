const audioPlayer = {
  cover: document.querySelector("#audio-player"),
  artist: document.querySelector("#artist"),
  title: document.querySelector("#title"),
  artistTitleContainer: document.querySelector("#artist-title-container"),
  progressContainer: document.querySelector("#progress-container"),
  progressBar: document.querySelector("#progress-bar"),
  currentTimeDisplay: document.querySelector("#current-time"),
  totalTimeDisplay: document.querySelector("#total-time"),
  rewind: document.querySelector("#rwd"),
  play: document.querySelector("#play"),
  forward: document.querySelector("#fwd"),
  audio: document.getElementsByTagName("audio")[0],
  shuffleButton: document.querySelector("#shuffle"),
  menu: document.querySelector("#menu"),
};

audioPlayer.cover.style.height = "70px";
audioPlayer.artistTitleContainer.style.opacity = "0";
audioPlayer.progressContainer.style.opacity = "0";

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
  {
    title: "Highest In The Room",
    artist: "Travis Scott",
    url: "../assets/audio/hitr.m4a",
    cover: "../assets/img/hitr.png",
  },
  {
    title: "Flex",
    artist: "Tory Lanez",
    url: "../assets/audio/flex.m4a",
    cover: "../assets/img/itoldu.jpeg",
  },
  {
    title: "Heaven Or Hell",
    artist: "Don Toliver",
    url: "../assets/audio/HeavenOrHell.m4a",
    cover: "../assets/img/hoh.png",
  },
  {
    title: "I-95",
    artist: "Tory Lanez",
    url: "../assets/audio/I-95.mp3",
    cover: "../assets/img/lostcause.jpg",
  },
  {
    title: "Rudolph",
    artist: "Don Toliver",
    url: "../assets/audio/rudolph.mp3",
    cover: "../assets/img/rudolph.jpg",
  },
];

let currentSong = 0;

function changeSong() {
  const currentSongData = song[currentSong];
  audioPlayer.audio.src = currentSongData.url;
  audioPlayer.cover.style.backgroundImage = `url(${currentSongData.cover})`;
  audioPlayer.audio.play();
  audioPlayer.play.style.backgroundImage = "url(../assets/img/pause.png)";
  audioPlayer.play.style.scale = "1.1";
  audioPlayer.play.classList.add("playing");
  audioPlayer.play.classList.remove("pause");
  audioPlayer.artist.textContent = currentSongData.artist;
  audioPlayer.title.textContent = currentSongData.title;
  audioPlayer.progressContainer.style.opacity = "1";
  audioPlayer.artistTitleContainer.style.opacity = "1";
  audioPlayer.cover.style.height = "90px";
}

function updateProgressBar() {
  const currentTime = audioPlayer.audio.currentTime;
  const duration = audioPlayer.audio.duration;

  const currentMinutes = Math.floor(currentTime / 60);
  const currentSeconds = Math.floor(currentTime % 60);
  const totalMinutes = Math.floor(duration / 60);
  const totalSeconds = Math.floor(duration % 60);

  audioPlayer.currentTimeDisplay.textContent = `${currentMinutes}:${
    currentSeconds < 10 ? "0" : ""
  }${currentSeconds}`;
  audioPlayer.totalTimeDisplay.textContent = `${totalMinutes}:${
    totalSeconds < 10 ? "0" : ""
  }${totalSeconds}`;

  const progress = (currentTime / duration) * 100;
  audioPlayer.progressBar.style.width = `${progress}%`;

  if (currentTime === duration) {
    currentSong++;
    if (currentSong >= song.length) {
      currentSong = 0;
    }
    changeSong();
  }
}

audioPlayer.rewind.addEventListener("click", function () {
  currentSong = currentSong > 0 ? currentSong - 1 : song.length - 1;
  changeSong();
});

audioPlayer.forward.addEventListener("click", function () {
  currentSong = currentSong < song.length - 1 ? currentSong + 1 : 0;
  changeSong();
});

audioPlayer.play.addEventListener("click", function () {
  if (audioPlayer.audio.paused) {
    audioPlayer.audio.play();
    audioPlayer.play.style.backgroundImage = "url(../assets/img/pause.png)";
    audioPlayer.play.style.scale = "1.1";
    audioPlayer.play.classList.add("playing");
    audioPlayer.play.classList.remove("pause");
    audioPlayer.progressContainer.style.opacity = "1";
    audioPlayer.artistTitleContainer.style.opacity = "1";
    audioPlayer.cover.style.height = "90px";
  } else {
    audioPlayer.audio.pause();
    audioPlayer.play.style.backgroundImage = "url(../assets/img/play.png)";
    audioPlayer.play.style.scale = "1";
    audioPlayer.play.classList.remove("playing");
    audioPlayer.play.classList.add("pause");
    audioPlayer.progressContainer.style.opacity = "0";
    audioPlayer.artistTitleContainer.style.opacity = "0";
    audioPlayer.cover.style.height = "70px";
  }
});

audioPlayer.audio.src = song[currentSong].url;
audioPlayer.cover.style.backgroundImage = `url(${song[currentSong].cover})`;
audioPlayer.artist.textContent = song[currentSong].artist;
audioPlayer.title.textContent = song[currentSong].title;

audioPlayer.shuffleButton.addEventListener("click", function () {
  shuffleSong(song);
  currentSong = 0;
  changeSong();
  audioPlayer.shuffleButton.classList.toggle("playing");
});

audioPlayer.menu.addEventListener("click", openMenu);

audioPlayer.audio.addEventListener("timeupdate", updateProgressBar);

dragElement(document.getElementById("audio-player"));

function dragElement(player) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    player.style.top = player.offsetTop - pos2 + "px";
    player.style.left = player.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }

  if (document.getElementById(player.id + "controls")) {
    document.getElementById(player.id + "controls").onmousedown = dragMouseDown;
  } else {
    player.onmousedown = dragMouseDown;
  }
}

function shuffleSong(songArray) {
  for (let i = songArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [songArray[i], songArray[j]] = [songArray[j], songArray[i]];
  }
}

// bug fixen dat menu de player verkleint als het menu 90px is

function openMenu() {
  audioPlayer.cover.style.height === "70px"
    ? ((audioPlayer.cover.style.height = "250px"),
      audioPlayer.menu.classList.add("playing"),
      audioPlayer.menu.classList.remove("pause"))
    : ((audioPlayer.cover.style.height = "70px"),
      audioPlayer.menu.classList.add("pause"),
      audioPlayer.menu.classList.remove("playing"));
}
