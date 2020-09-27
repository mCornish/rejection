import React from 'react';
import PropTypes from 'prop-types';
import Question from '../Question/Question';
import styles from './QuestionList.module.css';

export default function QuestionList({
  questions,
  removeQuestion,
  statuses,
  updateQuestion,
  activeQuestionId,
  setActiveQuestionId,
}) {
  const accept = question => () => updateQuestion({ ...question, status: statuses.accept });
  const reject = question => () => updateQuestion({ ...question, status: statuses.reject });
  const remove = question => () => removeQuestion(question);
  const save = question => ({
    text = question.text,
    askee = question.askee
  } = {}) => updateQuestion({ ...question, askee, text });

  // const columnCount = questions.length >= 4 ? 4 : questions.length;

  return (
    <div
      className={styles.list}
      // style={{
      //   gridTemplateColumns: `repeat(${columnCount}, 1fr)`
      // }}
    >
      {questions.map(question => (
        <Question
          key={question.id}
          accept={accept(question)}
          reject={reject(question)}
          remove={remove(question)}
          save={save(question)}
          onClick={() => setActiveQuestionId(question.id)}
          isActive={activeQuestionId === question.id}
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
