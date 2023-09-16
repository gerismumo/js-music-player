const Audios = [
    {
        file: 'music/Reggae_Fest_Riddim_Mix_(Full)_Feat._Tarrus_Riley,_Chris_Martin,_Richie_Spice,_Etana_(Refix_2018)(128kbps).mp3',
    },
    {
        file: 'music/y2mate.com - TBT  RNB MIX BY THE JBTHEJUDGE.mp3'
    }
]

const playBtn = document.getElementById('play');
const pauseBtn = document.getElementById('pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressBar = document.querySelector('.progress');
const prevSecBtn = document.getElementById('prevSecs');
const nextSecBtn = document.getElementById('nextSecs');
const repeatBtn = document.getElementById('repeat');
const AudioBar = document.querySelector('.bar');

const audio = new Audio();
let currentAudioIndex = 0;
let isPlaying = false;

let pauseTime = 0;

playAudio = () => {
    const currentAudio = Audios[currentAudioIndex];
    audio.src = currentAudio.file;

    if(pauseTime > 0) {
        audio.currentTime = pauseTime;
        pauseTime = 0;
    }
    audio.play();
    isPlaying = true;
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';
}

const PauseAudio = (audio) => {
    pauseTime = audio.currentTime;
    audio.pause();
    isPlaying = false;
    pauseBtn.style.display = 'none';
    playBtn.style.display = 'inline-block';
}

const nextAudio = () => {
    currentAudioIndex += 1; 
    if(currentAudioIndex >= Audios.length) {
        currentAudioIndex = 0;
    }  

    const currentAudio = Audios[currentAudioIndex];
    audio.src = currentAudio;
    playAudio();
}

const prevAudio = () => {
    currentAudioIndex -= 1;

    if(currentAudioIndex < 0) {
        currentAudioIndex = Audios.length - 1;
    }

    const currentAudio = Audios[currentAudioIndex];
    audio.src = currentAudio;
    playAudio();
}

audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progressTimeBar = (currentTime / duration) * 100;
    progressBar.style.width = `${progressTimeBar}%`;
    progressBar.style.backgroundColor = '#21b3ed';
    progressBar.style.borderRadius = '5px';

});

const prevSeconds = () => {
    audio.currentTime -= 15;

    if(audio.currentTime === 0) {
        // prevAudio();
        audio.currentTime = 0;
    }
}

const nextSeconds = () => {
    audio.currentTime += 30;

    if(audio.currentTime === audio.duration) {
        // nextAudio();
        audio.currentTime = 0;
    }
}

let previousAudioIndex = -1;

const repeatAudio = () => {
    if(previousAudioIndex !== -1) {
        currentAudioIndex = previousAudioIndex;
    } else {
        if(isPlaying) {
            currentAudioIndex -= 1;

            if(currentAudioIndex < 0) {
                currentAudioIndex = Audios.length - 1;
            }
        } else {
            currentAudioIndex = 0;
        }
    }
    const currentAudio = Audios[currentAudioIndex];
    audio.src = currentAudio.file;
    playAudio();
    console.log(currentAudio.file);
}

updateAudioBar = (event) =>  {
    const {offsetX} = event;
    const progressBarAudio = progressBar.clientWidth;
    const duration = audio.duration;
    const currentTime = (offsetX / progressBarAudio) * duration;
    audio.currentTime = currentTime;
}

AudioBar.addEventListener('mousedown', (event) => {
    isPlaying = !audio.pause();
    if(isPlaying){
        audio.pause();
    }
    updateAudioBar(event);

    document.addEventListener('mousemove', updateAudioBar);
    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', updateAudioBar);
        if(isPlaying) {
            audio.play();
        }
    })
});

const volumeSlider = document.getElementById('volume-slider');
const volumeUp = document.getElementById('volume-up');
const volumeDown = document.getElementById('volume-down');

let volume = 1.0;
volumeSlider.addEventListener('input', () => {
    volume = parseFloat(volumeSlider.value);
    audio.volume = volume;
});

volumeUp.addEventListener('click', () => {
    if( volume < 1.0) {
        volume += 0.1;
        volume= Math.min(1.0, volume);
        audio.volume = volume;
        volumeSlider.value = volume;
    }
});

volumeDown.addEventListener('click', () => {
    if(volume > 0.0) {
        volume -= 0.1;
        volume = Math.max(0.0, volume);
        audio.volume = volume;
        volumeSlider.value = volume;
    }
})


playBtn.addEventListener('click', playAudio);
pauseBtn.addEventListener('click', () => PauseAudio(audio));
nextBtn.addEventListener('click', () => nextAudio());
prevBtn.addEventListener('click', () => prevAudio());
prevSecBtn.addEventListener('click', () => prevSeconds());
nextSecBtn.addEventListener('click', () => nextSeconds());
repeatBtn.addEventListener('click', () => repeatAudio());