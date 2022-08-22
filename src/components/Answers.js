import React, { Fragment } from 'react'
import CheckBox from './CheckBox'
import classes from '../styles/Answers.module.css'

const Answers = ({ options = [], handleChange, input }) => {

    return (
        <div className={classes.answers}>
            {
                options.map((option, index) => (
                    <Fragment key={index}>
                        {input ? (
                            <CheckBox
                                key={index}
                                className={classes.answer}
                                text={option.title}
                                value={index}
                                checked={option.checked}
                                onChange={(e) => handleChange(e, index)}
                            />
                        ) : (
                            <CheckBox
                                key={index}
                                className={`${classes.answer} ${option.correct ? classes.correct : option.checked ? classes.wrong : null}`}
                                text={option.title}
                                value={index}
                                defaultChecked={option.checked}
                                disabled
                            />
                        )}
                    </Fragment>
                ))
            }
        </div>
    )
}

export default Answers