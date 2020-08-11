import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addQuestion,
  selectQuestions,
  statuses,
  updateQuestion
} from './rejectionSlice';
import QuestionList from '../QuestionList/QuestionList';
import styles from './Rejection.module.css';

export default function Rejection() {
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

      <QuestionList
        questions={questions}
        statuses={statuses}
        updateQuestion={question => dispatch(updateQuestion(question))}
      />
    </div>
  );
}
