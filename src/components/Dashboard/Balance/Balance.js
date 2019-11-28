import React from 'react';
import PropTypes from 'prop-types';
import { IoMdTrendingUp, IoMdTrendingDown } from 'react-icons/io';
import s from '../../styles.module.css';

const Balance = ({ deposit, withdraw, balance }) => (
  <section className={s.balance}>
    <span>
      <span className={s.icons}>
        {' '}
        <IoMdTrendingUp />{' '}
      </span>
      {deposit}$
    </span>
    <span>
      <span className={s.icons}>
        <IoMdTrendingDown />
      </span>
      {withdraw}$
    </span>

    <span className={s.num}>Balance: {balance}$</span>
  </section>
);

Balance.propTypes = {
  deposit: PropTypes.number.isRequired,
  withdraw: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
};

export default Balance;
