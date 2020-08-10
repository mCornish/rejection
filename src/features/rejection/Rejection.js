import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addQuestion,
  selectQuestions
} from './rejectionSlice';
import styles from './Rejection.module.css';

export function Rejection() {
  const questions = useSelector(selectQuestions);
  const dispatch = useDispatch();

  return (
    <div>
      <button
        className={styles.button}
        aria-label="Add question"
        onClick={() => dispatch(addQuestion())}
      >
        Add Question
      </button>

      {questions.map(({ text }) => (
        <div>{text}</div>
      ))}
    </div>
  );
}
