import React,{useState} from 'react';
import { Input } from 'antd';
const { Search } = Input;

function SearchField ({onSearch}) {

    const [searchValue, setSearchValue] = useState('');

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchClick = (searchValue) => {
    onSearch(searchValue);
    setSearchValue("")
  };

  return (<>
        <div className='search'>  
            <Search placeholder="Search item here..."
            value={searchValue}
            onChange={handleChange} 
            onSearch={handleSearchClick} 
            enterButton />  
        </div>
  
        </>)
};
export default  SearchField;