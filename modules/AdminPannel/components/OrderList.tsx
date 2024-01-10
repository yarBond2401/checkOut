import React, { useState, useEffect } from 'react';
import styles from '../styles/admin-pannel.module.scss';
import OrderInfo from './OrderInfo';
import FilterInput from './FilterInput';
import { IOrderRecievedData } from '@/models/paymentInfo/IOrderRecievedData';

interface OrderListProps {
  ordersData: IOrderRecievedData[];
}

const OrderList: React.FC<OrderListProps> = ({ ordersData }) => {
  const [searchByEmailValue, setSearchByEmailValue] = useState<string>('');
  const [searchByOrderIdValue, setSearchByOrderIdValue] = useState<string>('');
  const [filteredItems, setFilteredItems] = useState<IOrderRecievedData[]>(ordersData);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(25);

  useEffect(() => {
    if (searchByEmailValue) {
      let filteredData = ordersData.filter((el) => el.data.Email.toLowerCase().includes(searchByEmailValue.toLowerCase()));
      if (searchByOrderIdValue) {
        filteredData = ordersData.filter((el) => el.data.transactionID.toLowerCase().includes(searchByOrderIdValue.toLowerCase()));
      }
      setFilteredItems(filteredData);
    } else if (searchByOrderIdValue) {
      let filteredData = ordersData.filter((el) => el.data.transactionID.toLowerCase().includes(searchByOrderIdValue.toLowerCase()));
      if (searchByEmailValue) {
        filteredData = ordersData.filter((el) => el.data.Email.toLowerCase().includes(searchByEmailValue.toLowerCase()));
      }
      setFilteredItems(filteredData);
    } else setFilteredItems(ordersData);
  }, [searchByEmailValue, searchByOrderIdValue]);

  /* ============================================================================================================================= */
  const lastRowIndex = currentPage * rowsPerPage;
  const firstRowIndex = lastRowIndex - rowsPerPage;
  const currentItems = filteredItems.slice(firstRowIndex, lastRowIndex);
  const pagButtons = [];
  for (let i = 1; i <= Math.ceil(filteredItems.length / rowsPerPage); i++) {
    pagButtons.push(i);
  }
  const paginate = (pageNum: number) => setCurrentPage(pageNum);
  const nextPage = () => {
    if (currentPage === pagButtons.length) {
      return;
    }
    setCurrentPage((actual) => actual + 1);
  };
  const prevPage = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage((actual) => actual - 1);
  };
  /* ============================================================================================================================= */

  return (
    <>
      {ordersData.length && (
        <section className={styles.section}>
          <h1 className={styles.title}>Admin Pannel</h1>
          <div className={styles.divider}></div>
          <div className={styles.tools}>
            <FilterInput placeholder="Sort by Email" searchValue={searchByEmailValue} setSearchValue={setSearchByEmailValue} />
            <FilterInput placeholder="Sort by Order Id" searchValue={searchByOrderIdValue} setSearchValue={setSearchByOrderIdValue} />
          </div>
          <div className={styles.divider}></div>
          <div className={styles.items}>
            {currentItems?.map((el, index) => (
              <OrderInfo order={el} key={index} />
            ))}
          </div>
          <div className={styles.pagination}>
            {pagButtons.map((el) => (
              <button onClick={() => paginate(el)} key={el} className={styles.pagButton}>
                {el}
              </button>
            ))}
          </div>
          <div className={styles.nextPrev}>
            <button onClick={prevPage} className={styles.nextPrev__button}>
              Prev
            </button>
            <button onClick={nextPage} className={styles.nextPrev__button}>
              Next
            </button>
          </div>
        </section>
      )}
    </>
  );
};
export default OrderList;
