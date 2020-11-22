let timeDelation = 10000;
let imgIntervalTime = 5000;
let currentTime = new Date().getTime();
let lastActiveTime = 0;
let isActive = false;
let imgList = [
    'https://images.pexels.com/photos/1275929/pexels-photo-1275929.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=9060',
    'https://images.pexels.com/photos/1451074/pexels-photo-1451074.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=450&w=560',
    'https://images.pexels.com/photos/1460880/pexels-photo-1460880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=200',
    'https://images.pexels.com/photos/1437629/pexels-photo-1437629.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=500',
    'https://images.pexels.com/photos/87284/ocean-seacoast-rocks-water-87284.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=426&w=400',
    'https://images.pexels.com/photos/885880/pexels-photo-885880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=1260',
    'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
];
let screenSaverDiv = document.querySelector('.screen_saver');

let img = document.createElement('img');
img.style.zIndex = '1';
screenSaverDiv.appendChild(img);

let imgInterval;

function checkInactivity(timeDelation, imgIntervalTime) {
    if (isActive && new Date().getTime() - lastActiveTime > timeDelation){
        isActive = false;
        screenSaverDiv.style.visibility = 'visible';
        screenSaver();
        imgInterval = setInterval(screenSaver, imgIntervalTime);
    }
}
  
function active() {
    lastActiveTime = new Date().getTime();
    if (!isActive) {
        isActive = true;
        screenSaverDiv.style.visibility = 'hidden';
        clearInterval(imgInterval);
    }
}

function screenSaver() {
    let randImg = Math.floor(Math.random() * imgList.length);
    img.setAttribute('src', imgList[randImg]);
    img.onload = function(){
        let randX = Math.random()*(document.documentElement.clientWidth - img.width);
        let randY = Math.random()*(document.documentElement.clientHeight - img.height);
        screenSaverDiv.setAttribute('style', `top:${randY>=0 ? randY : 0}px; right:${randX>=0 ? randX : 0}px;`);
        setTimeout(function(){ screenSaverDiv.classList.add("visible") }, 500);
        setTimeout(function(){ screenSaverDiv.classList.remove("visible") }, imgIntervalTime-500);
    }
}

window.addEventListener('mousemove', active);
window.addEventListener('click', active);
window.addEventListener('keypress', active);
window.addEventListener('scroll', active);

setInterval(checkInactivity, 1000, timeDelation, imgIntervalTime);
active();