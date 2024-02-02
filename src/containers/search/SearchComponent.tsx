import React from 'react';
type Props = {

    onChange: (e: any) => void;
    search: {
        all: boolean;
        회로물: boolean;
        전장물: boolean;
        기구물: boolean;
        기타물: boolean;
    };
    focus: boolean;
    setFocus: React.Dispatch<React.SetStateAction<boolean>>
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}
const SearchComponent: React.FC<Props> = ({ visible, onChange, search, focus, setFocus }) => {
    return (
        <div className={`search-container ${visible ? 'visible' : ''}`}>
            <div className="group">
                <div>
                    <input type="checkbox" name="all" id="all" onChange={onChange} checked={search.all === true} />
                    <label htmlFor="all">전체</label>
                </div>
                <input type="checkbox" name="회로물" id="group-회로물" onChange={onChange} checked={search.회로물 === true} />
                <label htmlFor="group-회로물">회로물</label>
                <input type="checkbox" name="전장물" id="group-전장물" onChange={onChange} checked={search.전장물 === true} />
                <label htmlFor="group-전장물">전장물</label>
                <input type="checkbox" name="기구물" id="group-기구물" onChange={onChange} checked={search.기구물 === true} />
                <label htmlFor="group-기구물">기구물</label>
                <input type="checkbox" name="기타물" id="group-기타물" onChange={onChange} checked={search.기타물 === true} />
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

            <div className={`search ${focus ? 'focus' : ''}`}>
                <input type="text" className='searchInput' onFocus={() => setFocus(!focus)} onBlur={() => setFocus(!focus)} />

                <span className={`material-symbols-outlined `} onClick={() => setFocus(!focus)}>
                    search
                </span>

            </div>
        </div >
    );
};

export default SearchComponent;