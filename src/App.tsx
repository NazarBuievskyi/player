import React, {useRef, useState} from 'react';
import {Song} from "./components/Song";
import {Player} from "./components/Player";
import './styles/app.scss'
import data from './data'
import {Library} from "./components/Library";
import {Nav} from "./components/Nav";

function App() {
    //Ref
    const audioRef = useRef(null)
    //State
    // @ts-ignore
    const [songs, setSongs] = useState(data())
    const [currentSong, setCurrentSong] = useState(songs[0])
    const [isPlaying, setIsPlaying] = useState(false)
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0
    })
    const [libraryStatus, setlibraryStatus] = useState(false)
    const timeUpdateHandler = (e: any) => {
        const current = e.target.currentTime
        const duration = e.target.duration
        //Calculate pers
        const roundedCurrent = Math.round(current)
        const roundedDuration = Math.round(duration)
        const animation = Math.round((roundedCurrent / roundedDuration) * 100)
        setSongInfo({...songInfo, currentTime: current, duration, animationPercentage: animation})
    }
    const songEndHandler = async () => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
        await setCurrentSong(songs[(currentIndex + 1) % songs.length])
        if(isPlaying) {
            setTimeout(() => { // @ts-ignore
                audioRef.current.play()}, 100)
        }

    }



    return (
        <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
            <Nav libraryStatus={libraryStatus} setlibraryStatus={setlibraryStatus}/>
            <Song currentSong={currentSong}/>
            <Player setCurrentSong={setCurrentSong} setSongs={setSongs} songs={songs} songInfo={songInfo}
                    setSongInfo={setSongInfo} audioRef={audioRef} setIsPlaying={setIsPlaying} isPlaying={isPlaying}
                    currentSong={currentSong}/>
            <Library libraryStatus={libraryStatus} setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef}
                     songs={songs} setCurrentSong={setCurrentSong}/>
            <audio onTimeUpdate={timeUpdateHandler}
                   onLoadedMetadata={timeUpdateHandler}
                   ref={audioRef}
                   src={currentSong.audio}
                   onEnded={songEndHandler}
            >
            </audio>
        </div>
    );
}

export default App;
