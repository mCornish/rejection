import React, { useState } from 'react';
import PropTypes from 'prop-types';

import QuestionList from '../QuestionList/QuestionList';
import styles from './Rejection.module.css';

export default function Rejection({
  questions = [],
  score = 0,
  statuses,

  addQuestion = () => {},
  removeQuestion = () => {},
  updateQuestion = () => {},
}) {
  const [activeQuestionId, setActiveQuestionId] = useState(null);

  return (
    <div onClick={() => setActiveQuestionId(null)}>
      <div className={styles.score} aria-label="score">Score: {score}</div>

      {(!statuses || (questions[0] || {}).status !== statuses.default) && (
        <button
          className={styles.addQuestion}
          aria-label="Add question"
          onClick={addQuestion}
        >
          + Add Question
        </button>
      )}

      <QuestionList
        questions={questions}
        statuses={statuses}
        removeQuestion={removeQuestion}
        updateQuestion={updateQuestion}
        setActiveQuestionId={setActiveQuestionId}
        activeQuestionId={activeQuestionId}
      />
    </div>
  );
}

Rejection.propTypes = {
  score: PropTypes.number,
}
