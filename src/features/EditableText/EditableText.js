import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './EditableText.module.css';

export default function EditableText({
  defaultIsEditing = false,
  isActive = true,

  onChange = () => {},
  onSave = () => {},

  id,
  placeholder,
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
  }, [isEditing, textInput]);

  return isEditing ? (
    <div className={`EditableText ${styles.form}`}>
      <input
        ref={node => (textInput = node)}
        id={id}
        onChange={() => handleChange(textInput.value)}
        onBlur={() => handleBlur(textInput.value)}
        placeholder={placeholder}
        defaultValue={text}
      />
      <span className={`${styles.savedText} ${isSaved ? styles.isActive : ''}`}>Saved!</span>
    </div>
  ) : (
    <button
      onClick={() => setIsEditing(true)}
      className={`${styles.editable} ${isActive ? styles.isActive : ''}`}
    >{text}</button>
  );

  function handleChange(value) {
    onChange(value);
    save(value);
  }

  function handleBlur(value) {
    if (value) setIsEditing(false);
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

  id: PropTypes.string,
  placeholder: PropTypes.string,
  text: PropTypes.string,
}
