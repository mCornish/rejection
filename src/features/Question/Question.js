import React from 'react';
import PropTypes from 'prop-types';
// import styles from './QuestionList.module.css';

export default function Question({
  accept,
  askee,
  reject,
  status,
  text,
  timestamp
}) {
  let input;

  return (
    <div>
      <div>{text}</div>
      <input
        placeholder="Can I drive your Mercedes?"
      />
      <button onClick={reject}>Rejected</button>
      <button onClick={accept}>Accepted</button>
    </div>
  );
}

Question.propTypes = {
  accept: PropTypes.func.isRequired,
  reject: PropTypes.func.isRequired,
  timestamp: PropTypes.number.isRequired,
  askee: PropTypes.string,
  status: PropTypes.string,
  text: PropTypes.string
}
