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
    const onChange = (e: any) => {
        const { name, checked } = e.target;
        if (name === 'all') {
            dispatch(SearchActions.checkAll(checked))
        } else {
            dispatch(SearchActions.checkCategory(name))
        }
        dispatch(itemActions.backupItems())
    }
    useEffect(() => {
        const { all, ...rest } = search;
        const conditions = []
        const keys = Object.keys(rest);
        for (let key of keys) {
            if (search[key]) {
                conditions.push(key)
            }
        }
        if (items) {

            const searchResult = conditions.map(condition => items.filter(item => item.category === condition)).flat().sort((a, b) => a.id - b.id)
            dispatch(itemActions.filteredItems(searchResult))

            if (search.결합 && search.회로 && search.전장 && search.기구 && search.기타) {
                dispatch(SearchActions.onlyCheckAll(true))
            } else {
                dispatch(SearchActions.onlyCheckAll(false))

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
            <SearchComponent setVisible={setVisible} visible={visible} onChange={onChange} search={search} focus={focus} setFocus={setFocus} />
        </div>
    );
};

export default SearchContainer;