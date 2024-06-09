import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { itemData } from '../../store/slices/itemSlice';



import LeftComponent from '../left/LeftComponent';
const RsettingContainer = () => {
    const dispatch = useDispatch();
    const { items } = useSelector(itemData)








    return (

        <LeftComponent items={items} />




    );
};
export default RsettingContainer;