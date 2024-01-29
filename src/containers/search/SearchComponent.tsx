import React from 'react';
type Props = {
    // setVisible: React.Dispatch<React.SetStateAction<boolean | undefined>>
    visible: boolean | undefined;
}
const SearchComponent: React.FC<Props> = ({ visible, }) => {
    return (
        <div className={`search-container ${visible ? 'visible' : ''}`}>
            <div className="group">
                <div>
                    <input type="checkbox" name="group" id="all" />
                    <label htmlFor="all">전체</label>
                </div>
                <input type="checkbox" name="group" id="group-회로물" />
                <label htmlFor="group-회로물">회로물</label>
                <input type="checkbox" name="group" id="group-전장물" />
                <label htmlFor="group-전장물">전장물</label>
                <input type="checkbox" name="group" id="group-기구물" />
                <label htmlFor="group-기구물">기구물</label>
                <input type="checkbox" name="group" id="group-기타물" />
                <label htmlFor="group-기타물">기타</label>
            </div>
            <div className="sort">
                <input type="radio" name="sort" id="category" />
                <label htmlFor="category">분류 순</label>
                <button>△</button>
                <button>▽</button>
                <input type="radio" name="sort" id="name" />
                <label htmlFor="name">이름 순</label>
                <button>△</button>
                <button>▽</button>
                <input type="radio" name="sort" id="name" />
                <label htmlFor="name">생성일 순</label>
                <button>△</button>
                <button>▽</button>
            </div>

            <div className="search">
                <input type="text" className='searchInput' />
                {/* <span className={`material-symbols-outlined ${focus ? 'focus' : ''}`}> */}
                search
            </span>
        </div>
        </div >
    );
};

export default SearchComponent;