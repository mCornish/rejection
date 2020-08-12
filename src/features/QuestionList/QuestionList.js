import React from 'react';
import PropTypes from 'prop-types';
import Question from '../Question/Question';
// import styles from './QuestionList.module.css';

export default function QuestionList({
  questions,
  removeQuestion,
  statuses,
  updateQuestion
}) {
  const accept = question => () => updateQuestion({ ...question, status: statuses.accept });
  const reject = question => () => updateQuestion({ ...question, status: statuses.reject });
  const remove = question => () => removeQuestion(question);
  const save = question => (text, askee) => updateQuestion({ ...question, askee, text })

  return (
    <div>
      {questions.map(question => (
        <Question
          key={question.id}
          accept={accept(question)}
          reject={reject(question)}
          remove={remove(question)}
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
  removeQuestion: PropTypes.func.isRequired,
  statuses: PropTypes.shape({
    accept: PropTypes.string,
    default: PropTypes.string,
    reject: PropTypes.string,
  }).isRequired,
  updateQuestion: PropTypes.func.isRequired
}
