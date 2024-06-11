import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { itemData, itemActions } from '../../store/slices/itemSlice';
import { editActions } from '../../store/slices/editSlice';
import { formSelector, formActions } from '../../store/slices/formSlice';

import RsettingComponent from './RsettingComponent';

const RsettingContainer = () => {
    const dispatch = useDispatch();
    const { items, dragItems } = useSelector(itemData)
    const { input, edit, } = useSelector(formSelector)
    const openAddForm = () => {
        dispatch(formActions.toggle_form({ form: 'input', value: !input.visible }))
    }
    const changePosition = (form: string, position: { x: number, y: number }) => {
        dispatch(formActions.changePosition({ form, position }))
    }

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
    const onDrop = () => {
        dispatch(itemActions.initialDragItem())
    }
    const drag_on = (targetId: number) => {

        dispatch(itemActions.drag_on(targetId))
    }
    const addCount = (targetId: number | string | boolean, itemId: number | string | boolean) => {

        let idx = dragItems.findIndex(item => item.id === itemId && item.targetId === targetId)
        if (typeof targetId === 'number' && typeof itemId === 'number') {
            dispatch(itemActions.addCount(idx))
        }
    }
    const removeCount = (targetId: number | string | boolean, itemId: number | string | boolean) => {
        let idx = dragItems.findIndex(item => item.targetId === targetId && item.id === itemId)
        if (typeof targetId === 'number' && typeof itemId === 'number') {
            dispatch(itemActions.removeCount(idx))
        }
    }
    useEffect(() => {
        dispatch(itemActions.initForm())
        dispatch(itemActions.getItem())
    }, [dispatch])
    return (
        <RsettingComponent items={items} selectItem={selectItem} onDrop={onDrop} dragItem={dragItem} dragItems={dragItems}
            input={input} edit={edit} openAddForm={openAddForm} changePosition={changePosition}
            drag_on={drag_on} addCount={addCount} removeCount={removeCount} />
    );
};
export default RsettingContainer;