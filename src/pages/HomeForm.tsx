import React from 'react';
import HeaderContainer from '../containers/common/header/HeaderContainer';
import NavSearchContainer from '../containers/nav_search/NavSearchContainer';
import HomeContainer from '../containers/home/HomeContainer';
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