import React, { useEffect } from 'react';
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
    const removeRepair = (id: number) => {
        if (id)
            dispatch(itemActions.removeRepairs(id))
    }
    const inputRepair = () => {
        dispatch(itemActions.inputRepairs(repairs))
    }
    const initRepairs = () => {
        dispatch(itemActions.initRepairs())
    }
    useEffect(() => {
        dispatch(itemActions.getRepairs())
    }, [])
    return (
        <div>
            <ItemPickerComponent
                inputRepairs={inputRepairs}
                removeRepair={removeRepair}
                repairs={repairs}
                inputRepair={inputRepair}
                initRepairs={initRepairs}
                 />
        </div>
    );
};

export default ItemPickerContainer;