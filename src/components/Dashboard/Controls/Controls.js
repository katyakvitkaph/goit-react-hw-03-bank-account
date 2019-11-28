import React from 'react';
import PropTypes from 'prop-types';
import s from '../../styles.module.css';

const Controls = ({ onDeposit, onWithdraw, onChange, amount }) => (
  <section className={s.controls}>
    <input
      onChange={onChange}
      type="number"
      name="amount"
      value={amount === 0 ? '' : amount}
      className={s.inputControls}
    />
    <button onClick={onDeposit} type="button" className={s.but}>
      Deposit
    </button>
    <button onClick={onWithdraw} type="button" className={s.but}>
      Withdraw
    </button>
  </section>
);

export default Controls;

Controls.propTypes = {
  onDeposit: PropTypes.func.isRequired,
  onWithdraw: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  amount: PropTypes.number.isRequired,
};
