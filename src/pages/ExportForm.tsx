import React from 'react';
import HeaderContainer from '../containers/common/header/HeaderContainer';
import NavSearchContainer from '../containers/nav_search/NavSearchContainer';
import ExportContainer from '../containers/export/ExportContainer';
const ExportForm = () => {
    return (
        <div>
            <HeaderContainer />
            <NavSearchContainer />
            <ExportContainer />
        </div>
    );
};

export default ExportForm;