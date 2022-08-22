import React, { useRef, useState } from 'react'
import classes from '../styles/Miniplayer.module.css'
import ReactPlayer from 'react-player';


const Miniplayer = ({ id, videoTitle }) => {
    const buttonRef = useRef();
    const [status, setStatus] = useState(false);
    const videoUrl = `https://www.youtube.com/watch?v=${id}`

    function toggoleMiniPlayer() {
        if (!status) {
            buttonRef.current.classList.remove(classes.floatingBtn)
            setStatus(true)
        } else {
            buttonRef.current.classList.add(classes.floatingBtn)
            setStatus(false)
        }
    }

    return (
        <div className={`${classes.miniPlayer} ${classes.floatingBtn}`} ref={buttonRef} onClick={toggoleMiniPlayer} >
            <span className={`material-icons-outlined ${classes.open}`} > play_circle_filled </span>
            <span className={`material-icons-outlined ${classes.close}`} onClick={toggoleMiniPlayer}> close </span>
            <ReactPlayer className={classes.player} url={videoUrl} height='168px' width='300px' playing={status} controls />
            <p>{videoTitle}</p>
        </div>
    )
}

export default Miniplayer