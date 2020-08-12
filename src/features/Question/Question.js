import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from '../../Base.module.css';

export default function Question({
  accept,
  askee,
  reject,
  save,
  status,
  text,
  timestamp
}) {
  let input;
  const [isEditing, setIsEditing] = useState(true);

  return isEditing ? (
    <div>
      <input
        placeholder="Can I drive your Mercedes?"
        ref={node => (input = node)}
        // onChange={(e.target.value) => input = e.target.value}
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
    console.log("handleSave -> input", input)
    save(input.value);
    input.value = '';
    setIsEditing(false);
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
