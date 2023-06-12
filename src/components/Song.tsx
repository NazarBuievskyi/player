import React from 'react';
import {IMusic} from "../music";

type SongProps = {
    currentSong: IMusic
}

export function Song({currentSong}: SongProps) {
    return (
        <div className='song-container'>
            <img alt={currentSong.name} src={currentSong.cover}></img>
            <h2>{currentSong.name}Song Name</h2>
            <h3>{currentSong.artist}</h3>
        </div>
    )
}