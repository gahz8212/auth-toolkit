import React from 'react';
type Props = {
    setVisible: React.Dispatch<React.SetStateAction<boolean | undefined>>
    visible: boolean | undefined;
    onChange: (e: any) => void;
    search: {
        all: boolean;
        circuit: boolean;
        electric: boolean;
        mechanical: boolean;
        etc: boolean;
    }
}
const SearchComponent: React.FC<Props> = ({ visible, onChange, search }) => {
    return (
        <div className={`search-container ${visible ? 'visible' : ''}`}>
            <div className="group">
                <div>
                    <input type="checkbox" name="all" id="all" onChange={onChange} checked={search.all === true} />
                    <label htmlFor="all">전체</label>
                </div>
                <input type="checkbox" name="circuit" id="group-회로물" onChange={onChange} checked={search.circuit === true} />
                <label htmlFor="group-회로물">회로물</label>
                <input type="checkbox" name="electric" id="group-전장물" onChange={onChange} checked={search.electric === true} />
                <label htmlFor="group-전장물">전장물</label>
                <input type="checkbox" name="mechanical" id="group-기구물" onChange={onChange} checked={search.mechanical === true} />
                <label htmlFor="group-기구물">기구물</label>
                <input type="checkbox" name="etc" id="group-기타물" onChange={onChange} checked={search.etc === true} />
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
                <span className={`material-symbols-outlined `}>
                    search
                </span>
            </div>
        </div >
    );
};

export default SearchComponent;