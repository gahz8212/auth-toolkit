import React from 'react';
import NavComponent from './NavComponent';
import { PageActions, PageData } from '../../../store/slices/pageSlice';
import { useSelector, useDispatch } from 'react-redux';
type Props = {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}
const NavContainer: React.FC<Props> = ({ visible, setVisible }) => {
    const dispatch = useDispatch();
    const { currentPage } = useSelector(PageData)
    const changePage = (page: string) => {
        dispatch(PageActions.changePage(page))
    }
    return (
        <NavComponent visible={visible} setVisible={setVisible} page={currentPage} changePage={changePage} />


    );
};

export default NavContainer;