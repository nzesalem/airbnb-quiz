import React, { useContext, useEffect } from "react";

const QuestionOption = props => {
  const {
    id,
    value,
    name,
    choices,
    onChange,
    label = ""
  } = props;

  const isChecked = !!choices.find(c => c.answer === value)

  return (
    <li
      className={`option${isChecked ? ' checked' : ''}`}
      onClick={() => onChange({ name, value })}>
      <div className="option-container">
        <div className="tick">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10"><path fill="#FFF" fillRule="nonzero" d="M4.726 6.927L1.112 3.452 0 4.633 4.819 9.29 12 1.066 10.795 0z"></path>
          </svg>
        </div>
        <span>{label}</span>
      </div>
    </li>
  );
};

export default QuestionOption;