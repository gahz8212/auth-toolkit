import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { itemData, itemActions } from '../../store/slices/itemSlice';
import { relateData, relateActions } from '../../store/slices/relationSlice'
import { editActions, editData } from '../../store/slices/editSlice';
import { formSelector, formActions } from '../../store/slices/formSlice';
import RsettingComponent from './RsettingComponent';

import { makeRelateData_View } from '../../lib/utils/createRelateData'


const RsettingContainer = () => {
    const dispatch = useDispatch();
    const { items, dragItems, dragItem: dragedItem, relations } = useSelector(itemData)
    const { input, edit, relate } = useSelector(formSelector)
    const { status } = useSelector(editData);
    const { relate_view } = useSelector(relateData);

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
            if (typeof id === 'number') {

                const result = makeRelateData_View(id, relations, items)
                if (result) {

                    dispatch(relateActions.insertRelation_view(result))
                }
            }
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
    const addRelateGood = (
        item: {
            [key: string]: number | {}[]
        },
    ) => {
        dispatch(editActions.editItem(item))
        if (typeof item.id === 'number')
            addRelations(item.id)
    }
    useEffect(() => {
        dispatch(itemActions.initForm())
        dispatch(editActions.initForm())
        dispatch(itemActions.getItem())
        dispatch(relateActions.initRelate())
    }, [dispatch])


    const addRelations = (id: number) => {

        const createdRelations = dragItems?.map(dragItem => ({ UpperId: dragItem.targetId, LowerId: dragItem.id, point: dragItem.point }));
        // 현재 그룹창에 있는 새로운 dragItems를 relation 형식으로 변환
        console.log('dragedItem', dragItem)
        if (createdRelations) {
            const newRelations =
                relations?.filter(relation => relation.UpperId !== id)
            // 실제 relations에서 변환된 dragItems가 아닌것만 남긴 relations     
            console.log('createdRelations', createdRelations)
            console.log('newRelations', newRelations)
            if (createdRelations && newRelations) {
                console.log('updateRelations', [...createdRelations, ...newRelations])
                dispatch(itemActions.updateRelation([...createdRelations, ...newRelations]
                    //  변환된 dragItems가 없는 relations에 새로운 dragItems 주입

                ))
            }
        }
    }
    const inputDragItems = (dragItems: {}[]) => {
        dispatch(itemActions.inputDragItems(dragItems))
    }



    return (
        <RsettingComponent items={items} selectItem={selectItem} onDrop={onDrop} dragItem={dragItem} dragItems={dragItems}
            input={input} edit={edit} openAddForm={openAddForm} changePosition={changePosition}
            drag_on={drag_on} addCount={addCount} removeCount={removeCount} dragedItem={dragedItem} relate={relate}
            viewRelation={viewRelation} relations={relations} relate_view={relate_view} addRelateGood={addRelateGood}
            inputDragItems={inputDragItems} />
    );
};

export default RsettingContainer;