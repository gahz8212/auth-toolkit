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
    const { items, dragItems, dragItem: dragedItem, relations } = useSelector(itemData)
    const { input, edit, relate } = useSelector(formSelector)
    const { relate_view, relate_price } = useSelector(relateData);

    const openAddForm = () => {
        dispatch(formActions.toggle_form({ form: 'input', value: !input.visible }))
    }
    const changePosition = (form: string, position: { x: number, y: number }) => {
        dispatch(formActions.changePosition({ form, position }))
    }
    const selectItem = (id: number | '') => {
        console.log(id)
        const newItems = relations?.filter(relation => relation.UpperId === id)
            .map(relation => relation.LowerId)
            .map(id => items?.filter(item => item.id === id)).flat().map((arr => {
                if (arr) {
                    const point = relations.filter(relation => relation.UpperId === id && relation.LowerId === arr.id).map(relation => relation.point)[0];
                    return ({
                        id: arr.id, type: arr.type, category: arr.category, point: point,
                        im_price: arr.im_price, itemName: arr.itemName, targetId: id, unit: arr.unit

                    })
                } else {
                    return null
                }
            })
            )
        dispatch(editActions.inputDragItems(newItems))
        if (items) {
            const item = items.filter(item => item.id === id);
            dispatch(editActions.selectItem(item[0]));
            dispatch(formActions.toggle_form({ form: 'edit', value: true }))
        }
    }
    const viewRelation = (toggle: boolean) => {
        dispatch(formActions.toggle_form({ form: 'relate', value: toggle }))
    }
    const dragItem = (id: number | '') => {
        if (items) {
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
        dispatch(editActions.initForm())
        dispatch(itemActions.getItem())
        dispatch(relateActions.initRelate())
    }, [dispatch])


    useEffect(() => {
        if (items) {

            const result = makeRelateData_View(223,
                relations, items)
            dispatch(relateActions.insertRelation_view(result))
        }
    }, [dispatch,])

    // useEffect(() => {
    //     if (items && relations) {
    //         console.log('relations', relations)
    //         const result = makeRelateData_Price(223,
    //             relations, items)
    //         dispatch(relateActions.insertRelation_price(result))
    //     }
    // }, [dispatch])
    return (
        <RsettingComponent items={items} selectItem={selectItem} onDrop={onDrop} dragItem={dragItem} dragItems={dragItems}
            input={input} edit={edit} openAddForm={openAddForm} changePosition={changePosition}
            drag_on={drag_on} addCount={addCount} removeCount={removeCount} dragedItem={dragedItem} relate={relate}
            viewRelation={viewRelation} relations={relations} />
    );
};

export default RsettingContainer;