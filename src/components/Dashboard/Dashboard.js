import React, { Component } from 'react';
import uuid from 'uuid/v1';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Balance from './Balance/Balance';
import Controls from './Controls/Controls';
import TransactionHistory from './TransactionHistory/TransactionHistory';
import s from '../styles.module.css';

const noMoney = () =>
  toast.warn('На счету недостаточно средств для проведения операции!', {
    containerId: 'A',
  });
const noValue = () =>
  toast('Введите сумму для проведения операции!', { containerId: 'B' });

export default class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
    amount: 0,
  };

  componentDidMount() {
    const transFromLS = localStorage.getItem('transactions');
    if (transFromLS) {
      const newState = JSON.parse(transFromLS);
      this.setState({...newState});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { transactions } = this.state;
    if (prevState.transactions !== transactions) {
      localStorage.setItem('transactions', JSON.stringify({ ...this.state }));
    }
  }

  onDeposit = () => {
    if (this.state.amount === 0) {
      noValue();
    } else {
      this.setState(prevState => ({
        balance: prevState.balance + +prevState.amount,
      }));
      this.addNumber('DEPOSIT');
    }
    // this.reset();
  };

  onWithdraw = () => {
    if (this.state.amount < this.state.balance) {
      this.setState(prevState => ({
        balance: prevState.balance - +prevState.amount,
      }));
      this.addNumber('WITHDRAW');
    } else {
      noMoney();
    }
  };

  onChange = e => {
    this.setState({ amount: +e.target.value });
  };

  addNumber = type => {
    const { amount } = this.state;
    if (amount > 0) {
      const newTransaction = {
        id: uuid(),
        type,
        amount,
        date: new Date().toLocaleString('en-US', { hour12: false }),
      };

      this.setState(state => ({
        transactions: [...state.transactions, newTransaction],
      }));
      this.reset();
    }
  };

  reset = () => {
    // const { amount } = this.state;
    this.setState({
      amount: 0,
    });
  };

  render() {
    const { transactions } = this.state;
    const { balance } = this.state;
    const { amount } = this.state;

    const deposit = transactions.reduce((acc, el) => {
      if (el.type === 'DEPOSIT') {
        return acc + el.amount;
      }
      return acc;
    }, 0);

    const withdraw = transactions.reduce((acc, el) => {
      if (el.type === 'WITHDRAW') {
        return acc + el.amount;
      }
      return acc;
    }, 0);

    // console.log(deposit);
    return (
      <div className={s.dashboard}>
        <Controls
          onChange={this.onChange}
          onDeposit={this.onDeposit}
          onWithdraw={this.onWithdraw}
          amount={amount}
        />
        <Balance
          deposit={deposit}
          withdraw={withdraw}
          balance={balance}
          amount={amount}
        />

        <TransactionHistory transactions={transactions} />
        <ToastContainer />
      </div>
    );
  }
}
