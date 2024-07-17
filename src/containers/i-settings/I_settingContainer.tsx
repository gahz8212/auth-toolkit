import React, { useEffect } from 'react';
import { itemActions, itemData } from '../../store/slices/itemSlice';
import { useDispatch, useSelector } from 'react-redux'
import { relateData, relateActions } from '../../store/slices/relationSlice'
import { editActions, editData } from '../../store/slices/editSlice';
const I_settingContainer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(itemActions.initForm())
    dispatch(editActions.initForm())
    dispatch(itemActions.getItem())
    dispatch(relateActions.initRelate())
  }, [dispatch])
  return (
    <div>

    </div>
  );
};

export default I_settingContainer;