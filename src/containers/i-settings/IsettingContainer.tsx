import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { formSelector, formActions } from '../../store/slices/formSlice';
import IsettingComponent from './IsettingComponent';
const IsettingContainer = () => {
  const dispatch = useDispatch();
  const { input, edit, relate } = useSelector(formSelector)

  const openAddForm = () => {
    dispatch(formActions.toggle_form({ form: 'input', value: !input.visible }))
  }
  const changePosition = (form: string, position: { x: number, y: number }) => {
    dispatch(formActions.changePosition({ form, position }))
  }

  return (
    <IsettingComponent
      input={input}
      edit={edit}
      relate={relate}
      openAddForm={openAddForm}
      changePosition={changePosition}

    />
  );
};

export default IsettingContainer;