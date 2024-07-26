import React, { useEffect, useState } from 'react';
import RelationComponent from './RelationComponent';
import { useDispatch, useSelector } from 'react-redux';
import { relateData } from '../../../store/slices/relationSlice';
import { formActions } from '../../../store/slices/formSlice';
const RelationContainer = () => {
    const dispatch = useDispatch()
    const { relate_view } = useSelector(relateData)
    const [onlyParts, setOnlyParts] = useState<{
        currentId: number;
        itemName: string;
        top: number;
        left: number;
        point: number;
        sum_im_price: number;
        ex_price: number;
    }[] | null>(relate_view)
    const closeForm = () => {

        dispatch(formActions.toggle_form({ form: 'relate', value: false }))
    }
    useEffect(() => {
        if (relate_view) {
            const newItems = [...relate_view]
            newItems.splice(0, 1)
            setOnlyParts(newItems)
        }
    }, [relate_view])
    return (
        <div>
            <RelationComponent relate_view={onlyParts} closeForm={closeForm} />
        </div>
    );
};

export default RelationContainer;