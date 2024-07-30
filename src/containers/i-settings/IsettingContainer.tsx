import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { formSelector, formActions } from '../../store/slices/formSlice';
// import { itemData } from '../../store/slices/itemSlice';
import IsettingComponent from './IsettingComponent';
// import { makeRelateData_Price } from '../../lib/utils/createRelateData';
// import { relateActions } from '../../store/slices/relationSlice';
const IsettingContainer = () => {
  const dispatch = useDispatch();
  const { input, edit, relate } = useSelector(formSelector)
  // const { items, dragItems, relations } = useSelector(itemData)


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