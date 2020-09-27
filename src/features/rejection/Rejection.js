import React, { useState } from 'react';
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

  const [activeQuestionId, setActiveQuestionId] = useState(null);

  return (
    <div onClick={() => setActiveQuestionId(null)}>
      <div className={styles.score}>Score: {score}</div>

      {(questions[0] || {}).status !== statuses.default && (
        <button
          className={styles.addQuestion}
          aria-label="Add question"
          onClick={() => dispatch(addQuestion())}
        >
          + Add Question
        </button>
      )}

      <QuestionList
        questions={questions}
        statuses={statuses}
        removeQuestion={question => dispatch(removeQuestion(question))}
        updateQuestion={question => dispatch(updateQuestion(question))}
        setActiveQuestionId={setActiveQuestionId}
        activeQuestionId={activeQuestionId}
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
