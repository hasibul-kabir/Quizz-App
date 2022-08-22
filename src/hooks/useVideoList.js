import { useEffect, useState } from 'react'
import { get, getDatabase, limitToFirst, orderByKey, query, ref, startAt } from "firebase/database";


const useVideoList = (page) => {
    const [error, setError] = useState();
    const [loading, setLoading] = useState();
    const [videos, setVideos] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        async function fetchVideos() {
            const db = getDatabase()
            const videosRef = ref(db, "videos");
            const videoQuery = query(videosRef, orderByKey(), startAt("" + page), limitToFirst(8));
            try {
                setError(false);
                setLoading(true);
                const snapshot = await get(videoQuery);
                setLoading(false)

                if (snapshot.exists()) {
                    setVideos((prevVideos) => {
                        return [...prevVideos, ...Object.values(snapshot.val())]
                    })
                } else {
                    setHasMore(false)
                }
            } catch (error) {
                setError(true)
                setLoading(false)
            }
        }
        fetchVideos();
    }, [page])

    return {
        loading,
        error,
        videos,
        hasMore
    }
}

export default useVideoList