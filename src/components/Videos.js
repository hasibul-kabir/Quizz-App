import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import classes from '../styles/Videos.module.css'
import Video from './Video'
import useVideoList from '../hooks/useVideoList'
import InfiniteScroll from 'react-infinite-scroll-component';
import PageLoadingSpinner from './PageLoadingSpinner'


const Videos = () => {
    const [page, setPage] = useState(1)
    const { loading, error, videos, hasMore } = useVideoList(page);
    return (
        <div>
            {videos.length > 0 && (
                <InfiniteScroll
                    className={classes.videos}
                    dataLength={videos.length}
                    hasMore={hasMore}
                    next={() => setPage(page + 8)}
                    endMessage={
                        <p>
                            <b>You have seen it all!</b>
                        </p>
                    }
                >
                    {
                        videos.map((video) => (

                            video.noq > 0 ?
                                (
                                    <Link to={`/quiz/${video.youtubeID}`} state={{ videoTitle: video.title }} key={Math.random()}>
                                        <Video title={video.title} youtubeId={video.youtubeID} noq={video.noq} />
                                    </Link>
                                ) :
                                (
                                    <Video key={Math.random()} title={video.title} youtubeId={video.youtubeID} noq={video.noq} />
                                )

                        ))
                    }
                </InfiniteScroll>
            )
            }
            {!loading && videos.length === 0 && <div>There Has No Video!</div>}
            {error && <div>An Error Occured!</div>}
            {loading && <PageLoadingSpinner />}

        </div>

    )
}
export default Videos