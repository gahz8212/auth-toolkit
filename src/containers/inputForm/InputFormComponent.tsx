import { execFile } from 'child_process';
import React from 'react';
type Props = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>
        | React.ChangeEvent<HTMLTextAreaElement>) => void;

    input: {
        category: string,
        name: string,
        descript: string,
        unit: string,
        price: number,
        count: number,
        use: boolean,
        supplyer: string,

    };
    insertImage: (e: any) => void;
    imageList: { url: string }[];
    addItem: (item: {
        category: string,
        name: string,
        descript: string,
        unit: string,
        price: number,
        count: number,
        use: boolean,
        supplyer: string,
        imageList: { url: string }[]
    }) => void;
    formClose: () => void;
    excel_onChange: (e: any) => void;
    excel_onSubmit: () => void;
    file: ArrayBuffer | undefined | string | null;
    excelFile: React.LegacyRef<HTMLInputElement> | undefined

}
const InputFormComponent: React.FC<Props> = ({ onChange, input, insertImage, imageList, addItem, formClose,
    excel_onChange, excel_onSubmit, file, excelFile }) => {
    return (
        <div className={`form-container ${input.category}`}>

            <form className='input-form' onSubmit={(e) => {

                e.preventDefault();
                addItem({
                    category: input.category,
                    name: input.name,
                    descript: input.descript,
                    unit: input.unit,
                    price: input.price,
                    count: input.count,
                    use: input.use,
                    supplyer: input.supplyer,
                    imageList
                })
            }}>
                <div className="inputs">
                    {/* <div className='form-title'>아이템 입력</div> */}
                    <div className="category">
                        <input type="radio" id="회로물_input" name="category" value="회로물" checked={input.category === '회로물'} onChange={onChange} />
                        <label htmlFor="회로물_input">회로</label>
                        <input type="radio" id="전장물_input" name="category" value="전장물" checked={input.category === "전장물"} onChange={onChange} />
                        <label htmlFor="전장물_input">전장</label>
                        <input type="radio" id="기구물_input" name="category" value="기구물" checked={input.category === "기구물"} onChange={onChange} />
                        <label htmlFor="기구물_input">기구</label>
                        <input type="radio" id="기타물_input" name="category" value="기타물" checked={input.category === "기타물"} onChange={onChange} />
                        <label htmlFor="기타물_input">기타</label>
                    </div>


                    <input type="text" name="name" value={input.name} onChange={onChange} placeholder='이름 입력' onFocus={e => e.target.select()} />
                    <div>

                        <textarea name="descript" value={input.descript} onChange={onChange} placeholder='설명 입력' onFocus={e => e.target.select()}>{input.descript}</textarea>
                    </div>
                    <input type="number" name="count" value={input.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} onChange={onChange} min={0} placeholder='수량 입력' onFocus={e => e.target.select()} />
                    <div className="currency">

                        <input type="radio" id="￦_input" value="\\" name="unit" checked={input.unit === "\\\\"} onChange={onChange} />
                        <label htmlFor="￦_input">￦</label>
                        <input type="radio" id="$_input" value="$" name="unit" checked={input.unit === "$"} onChange={onChange} />
                        <label htmlFor="$_input">$</label>
                        <input type="radio" id="￥_input" value="￥" name="unit" checked={input.unit === "￥"} onChange={onChange} />
                        <label htmlFor="￥_input">￥</label>
                        <input type="number" name="price" value={input.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} onChange={onChange} min={0} placeholder='단가 입력' onFocus={e => e.target.select()} />
                    </div>
                    {/* //Number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") */}
                    <div>
                    </div>
                    <div>

                        <div className="uses">
                            <input type="text" name="supplyer" value={input.supplyer} onChange={onChange} placeholder='공급자 입력' onFocus={e => e.target.select()} />
                            <input id='use' type="radio" name="use" value={1} onChange={onChange} checked={input.use === true} />
                            <label htmlFor="use">사용</label>
                            <input id='no-use' type="radio" name="use" value={0} onChange={onChange} checked={input.use === false} />
                            <label htmlFor="no-use">미사용</label>
                        </div>
                    </div>
                    <div className='file'>
                        <label htmlFor="file_input">그림 선택</label>
                        <input type="file" id="file_input" name="images" onChange={insertImage} multiple accept='image/*' />
                    </div>
                </div>
                <div className="imageList">
                    {imageList.map((image, index) => <div key={index} className='image'><img src={image.url} width='90px' alt={image.url} /></div>)}
                </div>
                <div className="input-submit">

                    <label htmlFor="excel"><img src="/images/excel_btn.png" alt=''  ></img></label>
                    <input type="file" id='excel' onChange={excel_onChange} ref={excelFile}></input>
                    {file ? <button type='button' onClick={excel_onSubmit}>엑셀등록</button> : <button type='submit'>등록</button>}

                    <button className='close' onClick={formClose}>닫기</button>
                </div>
            </form>
        </div>
    );
};

export default InputFormComponent;