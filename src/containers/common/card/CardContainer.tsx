import React, { useEffect } from 'react';
import CardComponent from './CardComponent';
import { useSelector, useDispatch } from 'react-redux'
import { itemActions, itemData } from '../../../store/slices/itemSlice';
import { editActions } from '../../../store/slices/editSlice';
import { formSelector, formActions } from '../../../store/slices/formSlice';
const CardContainer = () => {
    const dispatch = useDispatch();
    const { items, status, relations } = useSelector(itemData);


    const selectItem = (id: number | '') => {

        const item = items?.filter(item => item.id === id);
        if (item) {
            dispatch(editActions.selectItem(item[0]));
        }
        dispatch(formActions.toggle_form({ form: 'edit', value: true }))
    }
    const dragItem = (id: number | '') => {
        const item = items?.filter(item => item.id === id).map(item => (
            {
                id: item.id,
                type: item.type,
                category: item.category,
                itemName: item.itemName,
                unit: item.unit,
                im_price: item.im_price,
                sum_im_price: item.sum_im_price,
                point: 0
                // desript: item.descript,
                // use: item.use,
            }
        ));
        if (item) {
            dispatch(itemActions.inputDragItem(item[0]))
            dispatch(editActions.inputDragItem(item[0]))
        }
    }
    const onDrop = () => {
        dispatch(itemActions.initialDragItem())
        dispatch(editActions.initialDragItem())
    }
    // useEffect(() => {
    //     dispatch(itemActions.initForm())
    //     dispatch(itemActions.getItem())
    // }, [dispatch])
    return (
        <div>
            <CardComponent
                items={items}
                selectItem={selectItem}
                dragItem={dragItem}
                onDrop={onDrop}
                viewMode={false}
            />
        </div>
    );
};

export default CardContainer;