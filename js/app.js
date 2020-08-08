window.onload = () => {
    const vid = document.getElementById("video");
    const btnplaypause = document.getElementById("play-icon");
    const btnvolume = document.getElementById("btn-volume");
    const volumeslider = document.getElementById("volume-slider");
    const btnmax = document.getElementById("btn-max");
    const progressbar = document.getElementsByClassName("progressbar")[0];
    const progressbarfill = document.getElementsByClassName("progressbar-fill")[0];

    // play/pause
    document.getElementById("play").addEventListener("click", playpause);
    vid.addEventListener("click", playpause);
    vid.addEventListener("pause", () => (btnplaypause.className = "fa fa-play"));
    vid.addEventListener("play", () => (btnplaypause.className = "fa fa-pause"));

    // video duration / progress bar / tooltip
    vid.addEventListener("loadedmetadata", (event) => {
        console.log("loadedmetadata");
        document.getElementById("total-time").innerHTML = " / " + convertTime(parseInt(vid.duration));

        vidTime = setInterval(function () {
            document.getElementById("current-time").innerHTML = convertTime(parseInt(vid.currentTime));
            let curTime = (vid.currentTime * 100) / vid.duration;
            progressbarfill.style.width = `${curTime}%`;
        }, 100);
    });

    progressbar.addEventListener("click", (e) => {
        let totalSize = progressbar.offsetWidth;
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        vid.currentTime = (vid.duration * x) / totalSize;
    });

    progressbar.addEventListener("mousemove", (e) => {
        let tooltip = document.getElementsByClassName("tooltip")[0];
        let totalSize = progressbar.offsetWidth;
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        tooltip.style.left = x - 0.5 * tooltip.offsetWidth + "px";
        tooltip.innerHTML = convertTime(parseInt((vid.duration * x) / totalSize));
    });

    // volume
    vid.volume = 0.5;
    btnvolume.addEventListener("click", () => {
        volumeslider.value = "0";
        changeVolume();
    });
    volumeslider.addEventListener("change", changeVolume);
    volumeslider.addEventListener("input", changeVolume); // ie

    // fullscreen
    vid.addEventListener("dblclick", toggleMax);
    btnmax.addEventListener("click", toggleMax);
};

function convertTime(time) {
    let min = Math.floor(time / 60);
    let sec = (time % 60).toString();
    return `${min}:${sec.padStart(2, "0")}`;
}

function playpause() {
    const vid = document.getElementById("video");
    if (!vid.paused) {
        vid.pause();
    } else {
        vid.play();
    }
}

function toggleMax() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.getElementsByClassName("c-video")[0].webkitRequestFullScreen();
    }
}

function changeVolume() {
    const vid = document.getElementById("video");
    const btnvolume = document.getElementById("btn-volume");
    const volumeslider = document.getElementById("volume-slider");
    vid.volume = volumeslider.value / 10;
    if (volumeslider.value < 5) {
        btnvolume.children[0].className = "fa fa-volume-down";
        if (volumeslider.value == 0) {
            btnvolume.children[0].className = "fa fa-volume-off";
        }
    } else {
        btnvolume.children[0].className = "fa fa-volume-up";
    }
    console.log(typeof volumeslider.value);
}
