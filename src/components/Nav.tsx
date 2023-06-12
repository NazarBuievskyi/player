import React, {Dispatch, SetStateAction} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMusic} from "@fortawesome/free-solid-svg-icons";

type NavProps = {
    libraryStatus: boolean
    setlibraryStatus: Dispatch<SetStateAction<boolean>>
}

export function Nav({libraryStatus, setlibraryStatus}: NavProps) {
    return (
        <nav>
            <h1>Waves</h1>
            <button onClick={() => setlibraryStatus(!libraryStatus)}>
                Library
                <FontAwesomeIcon icon={faMusic}/>
            </button>
        </nav>
    )
}