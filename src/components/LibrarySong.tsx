import React, {Dispatch, MutableRefObject, SetStateAction} from 'react';
import {IMusic} from "../music";

type LibrarySongProps = {
    song: IMusic
    setCurrentSong: Dispatch<SetStateAction<IMusic>>
    songs: IMusic[]
    audioRef: any
    isPlaying: boolean
    setSongs: Dispatch<SetStateAction<IMusic[]>>
}

export function LibrarySong({song, setCurrentSong, songs, audioRef, isPlaying, setSongs}: LibrarySongProps) {
    const songSelectHandler = async () => {
        await setCurrentSong(song)
        //Add active state
        const newSongs = songs.map((item) => {
            if(item.id === song.id){
                return{
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
        //Check playng song
        if (isPlaying) audioRef.current.play()
    }
    return (
        <div onClick={songSelectHandler} className={`library-container ${song.active? 'selected' : ''}`}>
            <img alt={song.name} src={song.cover}></img>
            <div className="song-description">
                <h3>{song.name}Song Name</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
}