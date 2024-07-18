import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { formSelector, formActions } from '../../store/slices/formSlice';
// import { SearchData, SearchActions } from '../../store/slices/searchSlice'
import IsettingComponent from './IsettingComponent';
const IsettingContainer = () => {
  const dispatch = useDispatch();
  const { input, edit, } = useSelector(formSelector)
  // const { search } = useSelector(SearchCondition)
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
      openAddForm={openAddForm}
      changePosition={changePosition}

    />
  );
};

export default IsettingContainer;