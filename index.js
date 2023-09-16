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

playBtn.addEventListener('click', playAudio);
pauseBtn.addEventListener('click', () => PauseAudio(audio));
nextBtn.addEventListener('click', () => nextAudio());
prevBtn.addEventListener('click', () => prevAudio());