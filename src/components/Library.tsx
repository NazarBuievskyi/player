import React, {Dispatch, MutableRefObject, SetStateAction} from 'react';
import {LibrarySong} from "./LibrarySong";
import {IMusic} from "../music";

type LibraryProps = {
    songs: IMusic[]
    setCurrentSong: Dispatch<SetStateAction<IMusic>>
    audioRef: MutableRefObject<null>
    isPlaying: boolean
    setSongs: Dispatch<SetStateAction<IMusic[]>>
    libraryStatus: boolean

}

export function Library({songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus}: LibraryProps) {
    return (
        <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song =>
                    <LibrarySong
                        audioRef={audioRef}
                        setSongs={setSongs}
                        songs={songs}
                        setCurrentSong={setCurrentSong}
                        isPlaying={isPlaying}
                        song={song}
                        key={song.id}
                    />)}
            </div>
        </div>
    )
}