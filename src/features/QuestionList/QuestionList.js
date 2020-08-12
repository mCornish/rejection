import React from 'react';
import PropTypes from 'prop-types';
import Question from '../Question/Question';
// import styles from './QuestionList.module.css';

export default function QuestionList({ questions, statuses, updateQuestion }) {
  const accept = question => () => updateQuestion({ ...question, status: statuses.accept });
  const reject = question => () => updateQuestion({ ...question, status: statuses.reject });
  const save = question => (text) => updateQuestion({ ...question, text})

  return (
    <div>
      {questions.map(question => (
        <Question
          key={question.id}
          accept={accept(question)}
          reject={reject(question)}
          save={save(question)}
          {...question}
        />
      ))}
    </div>
  );
}

QuestionList.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      askee: PropTypes.string,
      status: PropTypes.string,
      text: PropTypes.string
    })
  ).isRequired,
  statuses: PropTypes.shape({
    accept: PropTypes.string,
    default: PropTypes.string,
    reject: PropTypes.string,
  }),
  updateQuestion: PropTypes.func.isRequired
}
