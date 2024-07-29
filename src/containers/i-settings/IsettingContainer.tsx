import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { formSelector, formActions } from '../../store/slices/formSlice';
import { itemData } from '../../store/slices/itemSlice';
import IsettingComponent from './IsettingComponent';
import { makeRelateData_Price } from '../../lib/utils/createRelateData';
import { relateActions } from '../../store/slices/relationSlice';
const IsettingContainer = () => {
  const dispatch = useDispatch();
  const { input, edit, relate } = useSelector(formSelector)
  const { items, dragItems, relations } = useSelector(itemData)


  const openAddForm = () => {
    dispatch(formActions.toggle_form({ form: 'input', value: !input.visible }))
  }
  const changePosition = (form: string, position: { x: number, y: number }) => {
    dispatch(formActions.changePosition({ form, position }))
  }
  useEffect(() => {
    if (dragItems) {
      const result = dragItems.reduce((acc: { [key: number]: number }, curr) => {
        if (curr.type === 'SET' || curr.type === 'ASSY') {
          if (items) {
            const view = makeRelateData_Price(curr.id, relations, items)
            const price = view[0].sum_im_price * curr.point;
            if (acc[curr.targetId]) {
              acc[curr.targetId] = price + acc[curr.targetId]
            } else {
              acc[curr.targetId] = price

            }
          }
        } else {
          if (acc[curr.targetId]) {
            acc[curr.targetId] += curr.im_price * curr.point
          } else {
            acc[curr.targetId] = curr.im_price * curr.point
          }

        }
        return acc;
      }, {})
      dispatch(relateActions.calculateTotalPrice(result))
    }
  }, [dragItems])
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