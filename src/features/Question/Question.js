import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { statuses } from '../Rejection/rejectionSlice';
import styles from './Question.module.css';

import EditableText from '../EditableText/EditableText';

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
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      className={`${styles.container} ${statusClass(status)}`}
    >
      <button onClick={remove} className={styles.closeBtn}>X</button>

      <div className={styles.content}>
        <div>
          <span className={styles.timestamp}><strong>{formatTimestamp(timestamp)}</strong></span>
          <span>, I asked </span>
          <EditableText
            text={askee}
            onSave={handleAskeeSave}
            placeholder="Lewis Hamilton"
            isActive={isActive}
            defaultIsEditing={!askee}
            showCancel={!!askee}
          />
          <span>, "</span>
          {!text && (
            <span>Question: </span>
          )}
          <EditableText
            text={text}
            onSave={handleTextSave}
            placeholder="Can I drive your Mercedes?"
            isActive={isActive}
            defaultIsEditing={!text}
            showCancel={!!text}
          />
          <span>," and </span>
          {status === statuses.default ? (
            <span>{'I\'m waiting to hear back. 🤔'}</span>
          ) : (
            <span>{`they said "${status === statuses.accept ? 'Yes 😞' : 'No! 😄🎉'}"`}</span>
          )}
        </div>
      </div>
      
      {(status === statuses.default || isActive) && (
          status === statuses.default ? (
            <div className={`${styles.buttons}`}>
              <button
                onClick={reject}
                className={`${styles.rejectBtn}`}
              >Rejected</button>
              <button
                onClick={accept}
                className={`${styles.acceptBtn}`}
              >Accepted</button>
            </div>
          ) : (
            <div className={`${styles.buttons}`}>
              <button
                onClick={status === statuses.reject ? accept : reject}
                className={`${status === statuses.reject ? styles.acceptBtn : styles.rejectBtn}`}
              >Actually, I got {status === statuses.reject ? 'Rejected' : 'Accepted'}</button>
            </div>
          )
      )}
    </div>
  );

  function formatTimestamp(date) {
    const dateString = moment(timestamp).fromNow();
    return dateString[0].toUpperCase() + dateString.slice(1);
  }

  function handleAskeeSave(value) {
    save({ askee: value });
  }

  function handleTextSave(value) {
    save({ text: value });
    // setIsEditing(false);
    // textInput.value = '';
    // askeeInput.value = '';
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
