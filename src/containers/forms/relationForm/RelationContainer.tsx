import React from 'react';
import RelationComponent from './RelationComponent';
import { useDispatch, useSelector } from 'react-redux';
import { relateData } from '../../../store/slices/relationSlice';
const RelationContainer = () => {
    const dispatch = useDispatch()
    const { relate_view } = useSelector(relateData)
    // console.log(relate_view)
    return (
        <div>
            <RelationComponent relate_view={relate_view} />
        </div>
    );
};

export default RelationContainer;