const video = document.getElementById("video");
const videoThumbnail = document.getElementById("video-thumbnail");
const playPause = document.getElementById("play-pause");
const frwd = document.getElementById("skip-10");
const bkwrd = document.getElementById("skipminus-10");
const volume = document.getElementById("volume");
const mutebtn = document.getElementById("mute");
const videoContainer = document.querySelector(".videoContainer");
const progressBar = document.querySelector(".progress-bar");
const playbackline = document.querySelector(".playback-line");
const currentTimeRef = document.getElementById("current-time");
const maxDuration = document.getElementById("max-duration");
const fullScreenBtn = document.getElementById("fullscreen-btn");
const controls = document.querySelector(".controls");


playPause.addEventListener("click", function() {
  if (video.paused) {
    videoThumbnail.style.display = "none";
    video.play();
    playPause.innerHTML = '<i class="fa-solid fa-pause"></i>';
  } else {
    video.pause();
    playPause.innerHTML = '<i class="fa-solid fa-play"></i>';
  }
});

let isPlaying = false;

function togglePlayPause() {
  if (isPlaying) {
    video.pause();
    playPause.innerHTML = '<i class="fa-solid fa-play"></i>';
  } else {
    videoThumbnail.style.display = "none";
    video.play();
    playPause.innerHTML = '<i class="fa-solid fa-pause"></i>';
  }
}

document.addEventListener('keydown', function(event) {
  if (event.key === " " || event.key === "Spacebar") {
    event.preventDefault();
    togglePlayPause();
  }
});

video.addEventListener("play", function() {
  isPlaying = true;
});

video.addEventListener("pause", function() {
  isPlaying = false;
});

video.addEventListener("ended", function() {
  playPause.innerHTML = '<i class="fa-solid fa-play"></i>';
});


frwd.addEventListener("click", function() {
  video.currentTime += 5;
});

bkwrd.addEventListener("click", function() {
  video.currentTime -= 5;
});


mutebtn.addEventListener("click", function() {
  if (video.muted) {
    video.muted = false;
    mutebtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    volume.value = video.volume;
  } else {
    video.muted = true;
    mutebtn.innerHTML = '<i class="fas fa-volume-xmark"></i>';
    volume.value = 0;
  }
});

document.addEventListener("keydown", function(event) {
  if (event.key === "M" || event.key === "m") {
    event.preventDefault();
    if (video.muted) {
      video.muted = false;
      mutebtn.innerHTML = '<i class="fas fa-volume-up"></i>';
      volume.value = video.volume;
    } else {
      video.muted = true;
      mutebtn.innerHTML = '<i class="fas fa-volume-xmark"></i>';
      volume.value = 0;
    }
  }
});

volume.addEventListener("input", function() {
  video.volume = volume.value;
  if (video.volume == 0) {
    mutebtn.innerHTML = '<i class="fas fa-volume-xmark"></i>';
  } else {
    mutebtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  }
});


videoContainer.addEventListener("mouseenter", () => {
  controls.style.opacity = 1;
});

videoContainer.addEventListener("mouseleave", () => {
  if (!isPlaying) return;
  controls.style.opacity = 0;
});


video.addEventListener("timeupdate", () => {
  const currentTime = video.currentTime;
  const duration = video.duration;
  const percentage = (currentTime / duration) * 100;
  progressBar.style.width = percentage + "%";
});

function showThumbnail() {
  videoThumbnail.style.display = "block";
}

video.addEventListener("ended", () => {
  progressBar.style.width = "0%";
  showThumbnail();
});


function timeFormatter(time) { 
  let minute = Math.floor(time / 60);
  minute = minute < 10 ? "0" + minute : minute;
  let second = Math.floor(time % 60);
  second = second < 10 ? "0" + second : second;
  return `${minute}:${second}`;
}


video.addEventListener("timeupdate", () => {
  currentTimeRef.textContent = timeFormatter(video.currentTime);
  maxDuration.textContent = timeFormatter(video.duration);
});


playbackline.addEventListener("click", (e) => {
  let timelineWidth = playbackline.clientWidth;
  video.currentTime = (e.offsetX / timelineWidth) * video.duration;
});


function updateVolumeBackground() {
  const value = (volume.value - volume.min) / (volume.max - volume.min) * 100;
  volume.style.setProperty('--value', `${value}%`);
}

volume.addEventListener('input', updateVolumeBackground);
updateVolumeBackground();


fullScreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    videoContainer.requestFullscreen().catch((err) => {
      console.error(`Fullscreen error: ${err.message}`);
    });
    fullScreenBtn.innerHTML = '<i class="fa-solid fa-compress"></i>';
  } else {
    document.exitFullscreen();
    fullScreenBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
  }
});