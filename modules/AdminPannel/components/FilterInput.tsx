import React, { useState, useEffect } from 'react';
import styles from '../styles/admin-pannel.module.scss';
import { IoIosSearch } from 'react-icons/io';



interface FilterInputProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}

const FilterInput: React.FC<FilterInputProps> = ({ searchValue, setSearchValue, placeholder }) => {
  return (
    <div className={styles.filters}>
      <div className={styles.filters__wrapper}>
        <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder={placeholder} className={styles.filters__input} />
        <div className={styles.filters__icon}>
          <IoIosSearch />
        </div>
      </div>
    </div>
  );
};
export default FilterInput;
