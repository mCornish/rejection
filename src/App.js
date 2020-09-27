import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Rejection from './features/Rejection/Rejection';
import './App.css';

import {
  addQuestion,
  removeQuestion,
  selectQuestions,
  selectScore,
  statuses,
  updateQuestion
} from './features/Rejection/rejectionSlice';

function App() {
  const dispatch = useDispatch();
  const questions = useSelector(selectQuestions).slice().sort(timestampSort);
  const score = useSelector(selectScore);

  return (
    <div className="App">
      <Rejection
        addQuestion={() => dispatch(addQuestion())}
        removeQuestion={question => dispatch(removeQuestion(question))}
        questions={questions}
        score={score}
        statuses={statuses}
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

export default App;
