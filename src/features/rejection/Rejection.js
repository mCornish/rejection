import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addQuestion,
  removeQuestion,
  selectQuestions,
  selectScore,
  statuses,
  updateQuestion
} from './rejectionSlice';
import QuestionList from '../QuestionList/QuestionList';
import styles from './Rejection.module.css';

export default function Rejection() {
  const dispatch = useDispatch();
  const questions = useSelector(selectQuestions).slice().sort(timestampSort);
  const score = useSelector(selectScore);

  return (
    <div>
      <div>Score: {score}</div>

      <button
        className={styles.button}
        aria-label="Add question"
        onClick={() => dispatch(addQuestion())}
        disabled={!(questions[0] || {}).text}
      >
        Add Question
      </button>

      <QuestionList
        questions={questions}
        statuses={statuses}
        removeQuestion={question => dispatch(removeQuestion(question))}
        updateQuestion={question => dispatch(updateQuestion(question))}
      />
    </div>
  );

  function timestampSort(a, b) {
    return a.timestamp > b.timestamp ?
      -1 :
      a.timestamp < b.timestamp ?
      1 :
      0
  }
}
