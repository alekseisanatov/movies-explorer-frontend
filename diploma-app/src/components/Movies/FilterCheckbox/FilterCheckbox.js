import React from "react";
import './FilterCheckbox.css';

function FilterCheckbox() {
  function toggleCheckbox() {
    const button = document.querySelector('.filter__checkbox-ball');
    const checkbox = document.querySelector('.filter__checkbox-true');
    button.classList.toggle('filter__checkbox-ball_active');

    if(button.classList.contains('filter__checkbox-ball_active')) {
      checkbox.setAttribute('checked', true);
    } else {
      checkbox.removeAttribute('checked');
    }
  }


  return (
    <div className={'filter'}>
      <input className={'filter__checkbox-true'} type="checkbox" name={'checkbox'}/>
      <button onClick={toggleCheckbox} className={'filter__checkbox-fake'}>
        <span className={'filter__checkbox-ball'}></span>
      </button>
      <label className={'filter__label'} htmlFor={'checkbox'}>Короткометражки</label>
    </div>
  );
};

export default FilterCheckbox;