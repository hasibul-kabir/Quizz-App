import React from 'react'
import classes from '../styles/Video.module.css'

const Video = ({ title, youtubeId, noq }) => {
    return (
        <div className={classes.video}>
            <img src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`} alt={title} />
            <p>{title}</p>
            <div className={classes.qmeta}>
                <p>{noq} Questions</p>
                <p>Score : {noq * 5}</p>
            </div>
        </div>

    )
}

export default Video