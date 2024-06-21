import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { itemData, itemActions } from '../../store/slices/itemSlice';
import { relateData, relateActions } from '../../store/slices/relationSlice'
import { editActions } from '../../store/slices/editSlice';
import { formSelector, formActions } from '../../store/slices/formSlice';
import RsettingComponent from './RsettingComponent';

import { makeRelateData_View, makeRelateData_Price } from '../../lib/utils/createRelateData'


const RsettingContainer = () => {
    const dispatch = useDispatch();
    const { items, dragItems, dragItem: dragedItem } = useSelector(itemData)
    const { input, edit, relate } = useSelector(formSelector)
    const { relate_view, relate_price } = useSelector(relateData);

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
    const viewRelation = (toggle: boolean) => {
        dispatch(formActions.toggle_form({ form: 'relate', value: toggle }))
    }
    const dragItem = (id: number | '') => {
        const item = items.filter(item => item.id === id).map(item => (
            {
                id: item.id,
                type: item.type,
                category: item.category,
                itemName: item.itemName,
                unit: item.unit,
                im_price: item.im_price,
                point: 0
                // desript: item.descript,
                // use: item.use,
            }
        ));
        dispatch(itemActions.inputDragItem(item[0]))
        dispatch(editActions.inputDragItem(item[0]))
    }
    const onDrop = () => {
        dispatch(itemActions.initialDragItem())
        dispatch(editActions.initialDragItem())
    }
    const drag_on = (targetId: number, itemId: number) => {
        if ((dragItems.filter(dragItem => dragItem.id === itemId && dragItem.targetId === targetId).length === 0) && itemId !== targetId)
            dispatch(itemActions.drag_on(targetId))
    }
    const addCount = (targetId: number | string | boolean, itemId: number | string | boolean) => {

        let idx = dragItems.findIndex(item => item.id === itemId && item.targetId === targetId)
        if (typeof targetId === 'number' && typeof itemId === 'number') {
            dispatch(itemActions.addCount({ idx, targetId }))
        }
    }
    const removeCount = (targetId: number | string | boolean, itemId: number | string | boolean) => {
        let idx = dragItems.findIndex(item => item.targetId === targetId && item.id === itemId)
        if (typeof targetId === 'number' && typeof itemId === 'number') {
            dispatch(itemActions.removeCount({ idx, targetId }))
        }
    }
    useEffect(() => {
        dispatch(itemActions.initForm())
        dispatch(itemActions.getItem())
    }, [dispatch])
    useEffect(() => {
        const result = makeRelateData_View(3,
            [
                { upper: 3, current: 4, point: 1, im_price: 1, ex_price: 1 },
                { upper: 3, current: 5, point: 1, im_price: 1, ex_price: 1 }
            ])
        dispatch(relateActions.insertRelation_view(result))
    }, [dispatch])

    useEffect(() => {
        const result = makeRelateData_Price(
            [
                { upper: 3, current: 4, point: 1, im_price: 1, ex_price: 1 },
                { upper: 3, current: 5, point: 1, im_price: 1, ex_price: 1 }
            ])

        dispatch(relateActions.insertRelation_price(result))
    }, [dispatch])
    return (
        <RsettingComponent items={items} selectItem={selectItem} onDrop={onDrop} dragItem={dragItem} dragItems={dragItems}
            input={input} edit={edit} openAddForm={openAddForm} changePosition={changePosition}
            drag_on={drag_on} addCount={addCount} removeCount={removeCount} dragedItem={dragedItem} relate={relate}
            viewRelation={viewRelation} />
    );
};

export default RsettingContainer;