import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from '../../Base.module.css';

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
    <div>
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
    <div className={styles.row}>
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
}

Question.propTypes = {
  accept: PropTypes.func.isRequired,
  reject: PropTypes.func.isRequired,
  timestamp: PropTypes.number.isRequired,
  askee: PropTypes.string,
  status: PropTypes.string,
  text: PropTypes.string
}
