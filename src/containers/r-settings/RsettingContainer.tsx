import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { itemData, itemActions } from '../../store/slices/itemSlice';
import LeftComponent from '../left/LeftComponent';
import RestComponent from '../left/RestComponent';
const RsettingContainer = () => {
    const dispatch = useDispatch();
    const { items } = useSelector(itemData)
    const setItems = items.filter(item => item.type === 'SET')
    const otherItems = items.filter(item => item.type !== 'SET')





    useEffect(() => {
        dispatch(itemActions.initForm())
        dispatch(itemActions.getItem())
    }, [dispatch])

    return (
        <div className='contents'>
            <LeftComponent items={setItems} />
            <RestComponent items={otherItems} />


        </div>




    );
};
export default RsettingContainer;