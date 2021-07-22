const { default: fetch } = require("node-fetch");

const video = document.querySelector("video")
const playBtn = document.getElementById("play")
const muteBtn= document.getElementById("mute")
const volumeRange = document.getElementById("volume")
const currentTime= document.getElementById("currentTime")
const totalTime= document.getElementById("totalTime")
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen")
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls")
video.volumeValue = 0.5;


let controlsMovementTimeout = null;
let controlsTimeout= null;
let volume = 0.5;
video.volume = volume

const handlePlayClick = (e) => {
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
    playBtn.innerText = video.paused ? "Play" : "Pause";
    
}
const handleMute = (e) => {
    if(video.muted){
        video.muted = false;
    }else{
        video.muted = true;
    }
    muteBtn.innerText = video.muted ? "Unmuted" : "Muted";
    volumeRange.value = video.muted ? "0" : volumeValue;
};
const handelVolumeChange = (event) => {
    const{target:{
        value
    }} = event;
    volumeValue  = value
    video.volume = value;
    muteBtn.innerText = !Number(value) ? "Unmuted" : "Muted";
}
const handleLoadedMetadata = (event) => {
    totalTime.innerText = new Date(1000*Math.floor(video.duration)).toISOString().substr(11,8);
    timeline.max = Math.floor(video.duration);
} 
const handleTimeUpdate = (event) => {
    currentTime.innerText = new Date(1000*Math.floor(video.currentTime)).toISOString().substr(11,8);
    timeline.value = Math.floor(video.currentTime);
}
const handleTimelineChange = (event) => {
    const {target: {value}} = event;
    video.currentTime = value;
}
const handleFullscreen = (event) => {
    const fullscreen = document.fullscreenElement
    if(fullscreen){
        document.exitFullscreen();
        fullScreenBtn.innerText = 'Enter Full Screen';
    }else{
        videoContainer.requestFullscreen();
        fullScreenBtn.innerText = 'Exit Full Screen';
    }
}

const hideControls = () => videoControls.classList.remove("showing");


const handleMouseMove = () => {
    if(controlsTimeout){
        clearTimeout(controlsTimeout);
        controlsTimeout = null;
    }
    if(controlsMovementTimeout){
        clearTimeout(controlsMovementTimeout);
        // controlsMovementTimeout = null;
    }
    videoControls.classList.add('showing')
    controlsMovementTimeout = setTimeout(hideControls,3000); 
}
const handleMouseLeave = () => {
    controlsTimeout = setTimeout(hideControls,3000); 

}
const handleEnded = () => {
    const {id} = videoContainer.dataset;
    fetch(`/api/videos/${id}/view`, {
        method: "POST"
    });
}

playBtn.addEventListener('click',handlePlayClick );
muteBtn.addEventListener('click',handleMute );
volumeRange.addEventListener('input',handelVolumeChange)
video.addEventListener('loadedmetadata', handleLoadedMetadata)
video.addEventListener('timeupdate',handleTimeUpdate)
timeline.addEventListener('input',handleTimelineChange)
fullScreenBtn.addEventListener('click', handleFullscreen);
video.addEventListener('mousemove', handleMouseMove);
video.addEventListener('mouseleave', handleMouseLeave);
video.addEventListener('ended', handleEnded);