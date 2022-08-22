import { useEffect, useState } from 'react'
import { get, getDatabase, orderByKey, query, ref } from 'firebase/database'

const useQuestions = (videoID) => {
  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    async function fetchQuestions() {
      const db = getDatabase();
      const quizRef = ref(db, 'quiz/' + videoID + '/questions')
      const quizQuery = query(quizRef, orderByKey())
      try {
        setError(false)
        setLoading(true)
        const snapshot = await get(quizQuery)
        setLoading(false)
        if (snapshot.exists()) {
          setQuestions((prevQuestions) => {
            return [...Object.values(snapshot.val())]
          })
        };
      } catch (error) {
        console.log(error);
        setError(true)
      }
    }
    fetchQuestions();
  }, [videoID])

  return {
    loading,
    error,
    questions
  }
}

export default useQuestions