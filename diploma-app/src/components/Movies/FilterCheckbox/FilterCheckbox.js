import React from "react";
import './FilterCheckbox.css';



function FilterCheckbox({toggleCheckbox, isChecked}) {
  return (
    <div className={'filter'}>
      <input className={'filter__checkbox-true'} type="checkbox" name={'checkbox'}/>
      <button onClick={toggleCheckbox} className={'filter__checkbox-fake'}>
        <span className={`filter__checkbox-ball ${isChecked ? 'filter__checkbox-ball_active' : ''}`}></span>
      </button>
      <label className={'filter__label'} htmlFor={'checkbox'}>Короткометражки</label>
    </div>
  );
};

export default FilterCheckbox;