import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { statuses } from '../Rejection/rejectionSlice';
import styles from './Question.module.css';

export default function Question({
  accept,
  askee,
  reject,
  remove,
  save,
  status,
  text,
  timestamp
}) {
  let textInput, askeeInput;
  const [isEditing, setIsEditing] = useState(!(askee && text));

  return isEditing ? (
    <div className={`${styles.container} ${statusClass(status)}`}>
      <button onClick={remove}>Delete</button>
      <input
        placeholder="Can I drive your Mercedes?"
        ref={node => (textInput = node)}
        defaultValue={text}
      />
      <input
        placeholder="Lewis Hamilton"
        ref={node => (askeeInput = node)}
        defaultValue={askee}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  ) : (
    <div className={styles.container}>
      <div>{moment(timestamp).fromNow()}</div>
      <div>{text}</div>
      <button onClick={reject}>Rejected</button>
      <button onClick={accept}>Accepted</button>
    </div>
  );

  function handleSave() {
    save(textInput.value, askeeInput.value);
    setIsEditing(false);
    textInput.value = '';
    askeeInput.value = '';
  }

  function statusClass(status) {
    if (status === statuses.accept) return styles.accepted;
    if (status === statuses.reject) return styles.rejected;
    return '';
  }
}

Question.propTypes = {
  accept: PropTypes.func.isRequired,
  reject: PropTypes.func.isRequired,
  timestamp: PropTypes.number.isRequired,
  askee: PropTypes.string,
  status: PropTypes.string,
  text: PropTypes.string
}
