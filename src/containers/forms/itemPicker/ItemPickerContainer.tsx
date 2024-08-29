import React from 'react';
import ItemPickerComponent from './ItemPickerComponent';
import { useSelector, useDispatch } from 'react-redux';
import { itemData, itemActions } from '../../../store/slices/itemSlice'
const ItemPickerContainer = () => {
    const { repairs } = useSelector(itemData)
    const dispatch = useDispatch();
    const inputRepairs = (picked: {}) => {
        if (picked) {
            dispatch(itemActions.addRepairs(picked))
        }
    }
    return (
        <div>
            <ItemPickerComponent
                inputRepairs={inputRepairs}
                repairs={repairs} />
        </div>
    );
};

export default ItemPickerContainer;