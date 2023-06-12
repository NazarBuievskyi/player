import React, {Dispatch, SetStateAction, useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faAngleLeft, faAngleRight, faPause} from "@fortawesome/free-solid-svg-icons";
import {IMusic} from "../music";

type PlayerProps = {
    currentSong: IMusic
    setCurrentSong: Dispatch<SetStateAction<IMusic>>
    setIsPlaying: any
    isPlaying: any
    audioRef: any
    songs: IMusic[]
    songInfo: {
        animationPercentage: any;
        currentTime: number; duration: number;
    }
    setSongs: Dispatch<SetStateAction<IMusic[]>>
    setSongInfo: Dispatch<SetStateAction<{ currentTime: number; duration: number; animationPercentage: number }>>
}


export function Player({
                           setCurrentSong,
                           currentSong,
                           songs,
                           setIsPlaying,
                           isPlaying,
                           audioRef,
                           songInfo,
                           setSongInfo,
                           setSongs
                       }: PlayerProps) {

    //Use effect
    const nextSongHandler = (prevNext: IMusic) => {
        const newSongs = songs.map((item) => {
            if (item.id === prevNext.id) {
                return {
                    ...item,
                    active: true
                }
            } else {
                return {
                    ...item,
                    active: false
                }
            }
        })
        setSongs(newSongs)
    }
    //EventHandler
    const playSongHandler = () => {
        if (isPlaying) {
            // @ts-ignore
            audioRef.current.pause()
            setIsPlaying(!isPlaying)
        } else {
            // @ts-ignore
            audioRef.current.play()
            setIsPlaying(!isPlaying)
        }
    }
    const getTime = (time: number) => {
        return (
            Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
        )
    }
    const dragHandler = (e: any) => {
        // @ts-ignore
        audioRef.current.currentTime = e.target.value
        setSongInfo({...songInfo, currentTime: e.target.value, animationPercentage: 0})
    }

    const skipTrackHandler = async (direction: string) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
        if (direction === 'skip-forward') {
            await setCurrentSong(songs[(currentIndex + 1) % songs.length])
            nextSongHandler(songs[(currentIndex + 1) % songs.length])
        }
        if (direction === 'skip-back') {
            if ((currentIndex - 1) % songs.length === -1) {
                await setCurrentSong(songs[songs.length - 1])
                nextSongHandler(songs[songs.length - 1])
                if (isPlaying) audioRef.current.play()
                return
            }
           await setCurrentSong(songs[(currentIndex - 1) % songs.length])
            nextSongHandler(songs[(currentIndex - 1) % songs.length])

        }
        if (isPlaying) audioRef.current.play()
    }
    //Add styles
    const trackAnimation = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }

    return (
        <div className='player'>
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]}`}}
                     className="track">
                    <input min={0} max={songInfo.duration || 0} onChange={dragHandler} value={songInfo.currentTime}
                           type="range"/>
                    <div style={trackAnimation} className="animate-track"></div>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-back')} className='skip-back' size='2x'
                                 icon={faAngleLeft}/>
                <FontAwesomeIcon onClick={playSongHandler} className='play' size='2x'
                                 icon={isPlaying ? faPause : faPlay}/>
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-forward')} className='skip-forward' size='2x'
                                 icon={faAngleRight}/>
            </div>
        </div>
    )
}