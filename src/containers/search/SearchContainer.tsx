import React, { useEffect, useState } from 'react';
import SearchComponent from './SearchComponent';
import { SearchActions, SearchCondition } from '../../store/slices/searchSlice';
import { itemActions, itemData } from '../../store/slices/itemSlice';
import { useDispatch, useSelector } from 'react-redux'
import { relateData, relateActions } from '../../store/slices/relationSlice'
import { editActions, editData } from '../../store/slices/editSlice';
type Props = {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}
const SearchContainer: React.FC<Props> = ({ setVisible, visible }) => {
    const [focus, setFocus] = useState<boolean>(false)
    const dispatch = useDispatch();
    const { search } = useSelector(SearchCondition);
    const { items } = useSelector(itemData)
    const [newItems, setNewItems] = useState<{ type: string, category: string }[]>([])

    const onChange = (e: any) => {
        const { name, checked } = e.target;
        console.log(name, checked)
        if (name === 'typeALL') {

            dispatch(SearchActions.typeALL(checked))

        } else if (name === 'groupALL') {
            dispatch(SearchActions.groupALL(checked))
        } else if (name === 'SET' || name === 'ASSY' || name === 'PARTS') {
            dispatch(SearchActions.checkType(name))
        } else if (name === '포장' || name === '회로' || name === '전장' || name === '기구' || name === '기타') {
            dispatch(SearchActions.checkGroup(name))
        }
        // dispatch(itemActions.backupItems())
    }
    useEffect(() => {
        if (items) {

            const { all, ...rest } = search;


            const result = items.filter(item => rest.type[item.type])
            // console.log(result)
            setNewItems(result)
            // const searchResult = conditions.map(condition => items.filter(item => item.category === condition)).flat().sort((a, b) => a.id - b.id)
            // dispatch(itemActions.filteredItems(result))
            if (search.type.SET && search.type.ASSY && search.type.PARTS) {
                dispatch(SearchActions.typeCheckAll(true))
            } else {
                dispatch(SearchActions.typeCheckAll(false))
            }
            if (search.group.포장 && search.group.회로 && search.group.전장 && search.group.기구 && search.group.기타) {
                dispatch(SearchActions.groupCheckAll(true))
            } else {
                dispatch(SearchActions.groupCheckAll(false))

            }
        }

    }, [search, dispatch])
    useEffect(() => {
        dispatch(itemActions.initForm())
        dispatch(editActions.initForm())
        dispatch(itemActions.getItem())
        dispatch(relateActions.initRelate())
    }, [dispatch])
    return (
        <div>
            <SearchComponent setVisible={setVisible}
                visible={visible}
                onChange={onChange}
                search={search}
                focus={focus}
                setFocus={setFocus}
                newItems={newItems} />
        </div>
    );
};

export default SearchContainer;