import { get, getDatabase, orderByKey, query, ref } from 'firebase/database'
import { useEffect, useState } from 'react'

const useAnswers = (videoId) => {
    const [error, setError] = useState()
    const [loading, setLoading] = useState()
    const [answers, setAnswers] = useState([])

    useEffect(() => {
        async function fetchAnswers() {
            const db = getDatabase();
            const answersRef = ref(db, 'answers/' + videoId + '/questions')
            const answersQuery = query(answersRef, orderByKey());

            try {
                setError(false)
                setLoading(true)
                const snapshot = await get(answersQuery)
                setLoading(false)
                if (snapshot.exists()) {
                    setAnswers((prevAns) => {
                        return [...Object.values(snapshot.val())]
                    })
                }

            } catch (error) {
                setError(true)
            }
        }
        fetchAnswers()
    }, [videoId])
    return {
        loading,
        error,
        answers
    }
}

export default useAnswers