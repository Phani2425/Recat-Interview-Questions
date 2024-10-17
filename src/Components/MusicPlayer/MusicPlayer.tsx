import { useEffect, useRef, useState } from "react";

const tracks = [
    {
      title: "Track 1",
      source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      image: "https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Track 2",
      source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      image: "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg",
    },
    // Add more tracks as needed
  ];


const MusicPlayer = () => {

    const AudioRef = useRef<HTMLAudioElement | null>(null);;
    const [isPlaying,setisPlaying] = useState(false);
    const [progressPercent,setprogressPercent] = useState(0);
    const [currentTrack, setcurrentTrack] = useState(0);

    //i will use setinterval() for updating progress bar
    useEffect(() => {
        if(isPlaying){
            const intervalId = setInterval(() => {
                const currentPosition = AudioRef.current?.currentTime || 0;
                const duration = AudioRef.current?.duration || 0;
                const progressPercent = (currentPosition / duration) * 100;
                setprogressPercent(progressPercent);
            },1000)
        }
    },[isPlaying])

  return (
    <div className="w-8/12 mx-auto flex flex-col gap-5 justify-center items-center my-40">

        <h1 className="font-bold text-5xl mb-4">Your Own Music Player</h1>

        <div className=" h-52 w-52 rounded-full bg-slate-200 flex justify-center items-center">
            <img className="h-48 w-48 rounded-full " src={`${tracks[currentTrack].image}`} alt="music-cover" />
            {/* aur yaha me bina double or single quattion me src ka value likh raha tha jo ki galat hai as src allsways takes value in qutations */}
        </div>

        <div className="font-semibold">{tracks[currentTrack].title}</div>

        <audio
        ref={AudioRef}
         src={`${tracks[currentTrack].source}`} /> 
        {/* here i  learned thet if i dont add controlls attriibute in audio element then nothing will be shown... and here also i want that i want to give custom design to the player */}

        {/* progress bar */}
        <div className="w-[80%] bg-slate-300 h-2 rounded-lg">
            <div style={{ width: `${progressPercent}%` }} className={`h-full  ${isPlaying ? 'bg-blue-500' : 'bg-red-500'} rounded-lg` }></div>
        </div>

        <div>
        <button disabled={currentTrack === 0} className={`w-24 h-12 rounded-full bg-slate-500 text-white hover:scale-95 ${isPlaying? 'opacity-50' : 'opacity-100'}`} onClick={() => setcurrentTrack((prev) => (prev - 1) % tracks.length)}>
                prev
            </button>

            <button disabled={currentTrack === tracks.length-1} className={`w-24 h-12 rounded-full bg-slate-500 text-white hover:scale-95 `} onClick={() => {
                if(AudioRef?.current){
                    if( AudioRef?.current?.currentTime >= 10){
                        AudioRef.current.currentTime = AudioRef.current.currentTime-10;
                    }
                    else{
                        AudioRef.current.currentTime = 0
                    }
                }
                
            }}>
                Backward
            </button>

            <button className={`w-24 h-12 rounded-full bg-${isPlaying? 'blue-500' :'red-500'} text-white hover:scale-95 ${isPlaying? 'opacity-100' : 'opacity-50'}`} onClick={() => {
                setisPlaying(!isPlaying);
                if(!isPlaying){
                    AudioRef?.current?.play();
                }
                else{
                    AudioRef?.current?.pause();
                }
            }}>
                {isPlaying? 'Pause' : 'Play'}
            </button>

            <button disabled={currentTrack === tracks.length-1} className={`w-24 h-12 rounded-full bg-slate-500 text-white hover:scale-95 `} onClick={() => {

                if(AudioRef?.current){
                    if(AudioRef?.current?.currentTime <= AudioRef.current.duration-10){
                        AudioRef.current.currentTime = AudioRef.current.currentTime+10;
                    }
                    else{
                        AudioRef.current.currentTime = AudioRef.current.duration;
                    }
                }

            } }>
                Forward
            </button>

            <button disabled={currentTrack === tracks.length-1} className={`w-24 h-12 rounded-full bg-slate-500 text-white hover:scale-95 ${isPlaying? 'opacity-50' : 'opacity-100'}`} onClick={() => setcurrentTrack((prev) => (prev + 1) % tracks.length)}>
                Next
            </button>

            
        </div>

    </div>
  )
}

export default MusicPlayer