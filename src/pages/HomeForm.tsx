import React from 'react';
import HomeContainer from '../containers/home/HomeContainer';
import HeaderContainer from '../containers/common/header/HeaderContainer';
import NavSearchContainer from '../containers/nav_search/NavSearchContainer';
const HeaderForm = () => {
    return (
        <div>
            <HeaderContainer />
            <NavSearchContainer />
            <HomeContainer />
        </div>
    );
};

export default HeaderForm;