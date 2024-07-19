import React, { useEffect, useState } from 'react';
import SearchComponent from './SearchComponent';
import searchSlice, { SearchActions, SearchData } from '../../store/slices/searchSlice';
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
    const { search } = useSelector(SearchData);
    const { items } = useSelector(itemData)
    const [newItems, setNewItems] = useState<{ type: string, category: string, itemName: string }[]>([])

    const onChange = (e: any) => {
        const { name, checked } = e.target;
        // console.log(name, checked)
        if (name === 'typeALL') {
            dispatch(SearchActions.typeALL(checked))
        } else if (name === 'groupALL') {
            dispatch(SearchActions.groupALL(checked))
        } else if (name === 'setALL') {
            dispatch(SearchActions.setALL(checked))
        } else if (name === 'SET' || name === 'ASSY' || name === 'PARTS') {
            dispatch(SearchActions.checkType(name))
        } else if (name === 'EDT' || name === 'NOBARK' || name === 'RDT' || name === 'LAUNCHER' || name === '기타') {
            dispatch(SearchActions.checkSet(name))
        } else if (name === '포장' || name === '회로' || name === '전장' || name === '기구' || name === '기타') {
            dispatch(SearchActions.checkGroup(name))
        } else {
            dispatch(SearchActions.checkSort(name))
        }
        // dispatch(itemActions.backupItems())
    }
    useEffect(() => {
        if (search) {

            if (search.type.SET && search.type.ASSY && search.type.PARTS) {
                dispatch(SearchActions.typeCheckAll(true))
            } else {
                dispatch(SearchActions.typeCheckAll(false))
            }
            if (search.set.EDT && search.set.NOBARK && search.set.RDT && search.set.LAUNCHER && search.set.기타) {
                dispatch(SearchActions.setCheckAll(true))
            } else {
                dispatch(SearchActions.setCheckAll(false))
            }
            if (search.group.포장 && search.group.회로 && search.group.전장 && search.group.기구 && search.group.기타) {
                dispatch(SearchActions.groupCheckAll(true))
            } else {
                dispatch(SearchActions.groupCheckAll(false))
            }
        }

    }, [dispatch, search])

    useEffect(() => {
        if (search.type && search.set && search.group && items) {
            const { all, ...rest } = search;
            let result
            if (search.type.SET && !search.type.PARTS && !search.type.ASSY) {
                result = items?.filter(item => (rest.type[item.type] && rest.set[item.category]))
            } else if ((search.type.PARTS || search.type.ASSY) && !search.type.SET) {
                result = items?.filter(item => (rest.type[item.type] && rest.group[item.category]))
            }
            else {
                result = items?.filter(item => (rest.type[item.type]))
            }
            setNewItems(result)
            dispatch(SearchActions.getFilteredItems(result))


        }
    }, [dispatch, search.type, search.set, search.group, items])

    useEffect(() => {
        // console.log(search.sort)
        const result = [...newItems]
        const sortings = [{ sort: 'type' }, { sort: 'category' }, { sort: 'itemName' }, { sort: 'createdAt' },]
        const sortResult = sortings.filter(sorting => search.sort[sorting.sort])
        console.log(sortResult)
        let final;
        result.sort((prev, next) => {
            if (prev.type === next.type) {
                if (prev.category === next.category) {
                    return prev.itemName.localeCompare(next.itemName)
                }
                return prev.category.localeCompare(next.category)
            }
            return prev.type.localeCompare(next.type)

        }
        )

        // .sort((prev, next) => next.category.localeCompare(prev.category))

        dispatch(SearchActions.getFilteredItems(result))
    }, [dispatch, search.sort])
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
            />
        </div>
    );
};

export default SearchContainer;