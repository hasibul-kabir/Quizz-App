import React, { useEffect, useReducer, useState } from 'react'
import Answers from '../Answers'
import ProgressBar from '../ProgressBar'
import Miniplayer from '../Miniplayer'
import useQuestions from '../../hooks/useQuestions'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import _ from 'lodash'
import { getDatabase, ref, set } from 'firebase/database'
import { useAuth } from '../../Contexts/AuthContext'


const initialState = null;
const reducer = (state, action) => {
    switch (action.type) {
        case 'questions':
            action.value.forEach((question) => {
                question.options.forEach((option) => {
                    option.checked = false
                })
            })
            return action.value
        case 'answer':
            const questions = _.cloneDeep(state)
            questions[action.questionID].options[action.optionIndex].checked = action.value;
            return questions;
        default:
            return state
    }
}
const Quiz = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { videoTitle } = state;
    const { currUser } = useAuth();
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const { id } = useParams()
    const { loading, error, questions } = useQuestions(id)

    const [updatedQuestions, dispatch] = useReducer(reducer, initialState);


    useEffect(() => {
        dispatch({
            type: 'questions',
            value: questions
        })
    }, [questions])

    const handleAnswerChange = (e, index) => {
        dispatch({
            type: 'answer',
            questionID: currentQuestion,
            optionIndex: index,
            value: e.target.checked
        })
    }

    function next() {
        if (currentQuestion < questions.length) {
            setCurrentQuestion(prevCurrQs => prevCurrQs + 1)
        }
    }
    function prev() {
        if (currentQuestion > 0 && currentQuestion < questions.length) {
            setCurrentQuestion(prevCurrQs => prevCurrQs - 1)
        }
    }

    const progress = ((currentQuestion + 1) * 100) / questions.length;
    progress.toPrecision(2);

    // Handle Submit Quiz
    async function submitQuiz() {
        const db = getDatabase();
        const { uid } = currUser;

        const resultRef = ref(db, `result/${uid}`);
        await set(resultRef, {
            [id]: updatedQuestions
        })

        navigate(`/result/${id}`, {
            state: { updatedQuestions }
        })
    }

    return (
        <>
            {loading && <div>Loading...</div>}
            {error && <div>There was an error!</div>}
            {!loading && !error && updatedQuestions && updatedQuestions.length > 0 && (
                <>
                    <h1>{updatedQuestions[currentQuestion].title}</h1>
                    <h4>Question can have multiple answers</h4>
                    <Answers input options={updatedQuestions[currentQuestion].options} handleChange={handleAnswerChange} />
                    <ProgressBar next={next} prev={prev} progress={progress} submit={submitQuiz} />
                    <Miniplayer id={id} videoTitle={videoTitle} />
                </>
            )}
        </>
    )
}

export default Quiz