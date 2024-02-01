import React, { useEffect } from 'react';
import SearchComponent from './SearchComponent';
import { SearchActions, SearchCondition } from '../../store/slices/searchSlice';
import { itemActions, itemData } from '../../store/slices/itemSlice';
import { useDispatch, useSelector } from 'react-redux'
type Props = {
    setVisible: React.Dispatch<React.SetStateAction<boolean | undefined>>
    visible: boolean | undefined
}
const SearchContainer: React.FC<Props> = ({ setVisible, visible }) => {
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
    }
    useEffect(() => {

        const { all, ...rest } = search;
        const conditions: string[] = ['기구물']
        const keys = Object.keys(rest);
        for (let key of keys) {
            if (search[key]) {
                conditions.push(key)
            }
        }

        // console.log(dummy)
        const searchResult = conditions.map(condition => items.filter(item => item.category === condition)).flat()
        console.log(searchResult)

        dispatch(itemActions.filteredItems(searchResult))
        // dispatch(itemActions.originItems())

        if (search.circuit && search.electric && search.mechanical && search.etc) {
            dispatch(SearchActions.onlyCheckAll(true))
        } else {
            dispatch(SearchActions.onlyCheckAll(false))

        }
    }, [dispatch, search])
    return (
        <div>
            <SearchComponent setVisible={setVisible} visible={visible} onChange={onChange} search={search} />
        </div>
    );
};

export default SearchContainer;