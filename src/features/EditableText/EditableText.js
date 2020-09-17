import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './EditableText.module.css';

export default function EditableText({
  defaultIsEditing = false,
  isActive = true,
  onChange = () => {},
  onSave = () => {},
  placeholder,
  showCancel = true,
  text = '',
}) {
  let textInput;

  const [isEditing, setIsEditing] = useState(defaultIsEditing);
  const [isSaved, setIsSaved] = useState(false);

  // Focuses and selects input when starting to edit
  useEffect(() => {
    if (isEditing) {
      textInput.focus();
      textInput.select();
    }
  }, [isEditing]);

  return isEditing ? (
    <div className={`EditableText ${styles.form}`}>
      <input
        ref={node => (textInput = node)}
        onChange={() => handleChange(textInput.value)}
        onBlur={() => setIsEditing(false)}
        placeholder={placeholder}
        defaultValue={text}
      />
      <span className={`${styles.savedText} ${isSaved ? styles.isActive : ''}`}>Saved!</span>

      {/* <button onClick={() => save(textInput.value)}>Save</button>

      {showCancel && (
        <button onClick={cancel}>Cancel</button>
      )} */}
    </div>
  ) : (
    <button
      onClick={() => setIsEditing(true)}
      className={`${styles.editable} ${isActive ? styles.isActive : ''}`}
    >{text}</button>
  );

  function cancel() {
    textInput.value = text;
    setIsEditing(false);
  }

  function handleChange(value) {
    onChange(value);
    save(value);
  }

  function handleBlur() {

  }

  async function save(value) {
    setIsSaved(false);
    // setIsEditing(false);
    await onSave(value);
    setIsSaved(true);
  }
}

EditableText.propTypes = {
  defaultIsEditing: PropTypes.bool,
  isActive: PropTypes.bool,
  onChange: PropTypes.func,
  onSave: PropTypes.func,
  placeholder: PropTypes.string,
  text: PropTypes.string,
}
