import React, { useEffect } from 'react';
import CardComponent from './CardComponent';
import { useSelector, useDispatch } from 'react-redux'
import { itemActions, itemData } from '../../../store/slices/itemSlice';
import { editActions } from '../../../store/slices/editSlice';
import { formSelector, formActions } from '../../../store/slices/formSlice';
const CardContainer = () => {
    const dispatch = useDispatch();
    const { items, status, itemImageList } = useSelector(itemData);
    const selectItem = (id: number | '') => {
        const item = items.filter(item => item.id === id);
        dispatch(editActions.selectItem(item[0]));
        dispatch(formActions.toggle_form({ form: 'edit', value: true }))
    }
    const dragItem = (id: number | '') => {
        const item = items.filter(item => item.id === id).map(item => (
            {
                id: item.id,
                type: item.type,
                category: item.category,
                itemName: item.itemName,
                desript: item.descript,
                unit: item.unit,
                im_price: item.im_price,
                use: item.use,
                point: 0
            }
        ));

        dispatch(itemActions.inputDragItem(item[0]))


    }
    useEffect(() => {
        dispatch(itemActions.initForm())
        dispatch(itemActions.getItem())
    }, [dispatch])
    return (
        <div>
            <CardComponent
                selectItem={selectItem}
                items={items}
                itemImageList={itemImageList}
                dragItem={dragItem}
            />
        </div>
    );
};

export default CardContainer;