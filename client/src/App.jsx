
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import SavingsGoal from './components/SavingsGoal';
import TransactionList from './components/TransactionList';
import SpendingChart from './components/SpendingChart';
import SavingsChart from './components/SavingsChart';
import './App.css';

function App() {
    // state for my transactions list
    const [myTransactions, setMyTransactions] = useState([]);

    // state for the savings goal
    const [myGoal, setMyGoal] = useState(null);

    // load data when app starts
    useEffect(() => {
        getData();
    }, []);

    // function to fetch data from api
    const getData = async () => {
        try {
            // getting transactions
            let res1 = await axios.get('/api/transactions');
            setMyTransactions(res1.data);

            // getting savings goal
            let res2 = await axios.get('/api/savings');
            setMyGoal(res2.data);
        } catch (err) {
            console.log('error loading data', err);
        }
    };

    // add a new transaction
    const addNewTransaction = async (data) => {
        try {
            let res = await axios.post('/api/transactions', data);
            // add new item to the list
            setMyTransactions([res.data, ...myTransactions]);
        } catch (err) {
            console.log('error adding', err);
        }
    };

    // update the goal
    const updateMyGoal = async (data) => {
        try {
            let res = await axios.post('/api/savings', data);
            setMyGoal(res.data);
        } catch (err) {
            console.log('error updating goal', err);
        }
    };

    // Calculate total income
    const totalIncome = myTransactions
        .filter(t => t.type === 'income')
        .reduce((total, t) => total + t.amount, 0);

    // Calculate total expenses
    const totalExpenses = myTransactions
        .filter(t => t.type === 'expense')
        .reduce((total, t) => total + t.amount, 0);

    // figuring out how much user saved
    // only looking at 'Savings' category from input
    const moneySaved = myTransactions
        .filter(t => t.category === 'Savings')
        .reduce((total, t) => {
            if (t.type === 'income') {
                return total + t.amount;
            } else {
                return total - t.amount;
            }
        }, 0);

    return (
        <div id="app">
            <header>
                <h1 className="text-gradient">SmartBudget</h1>
            </header>

            <main className="grid">
                {/* showing the dashboard cards */}
                <Dashboard data={myTransactions} />

                <div className="grid grid-2">
                    <TransactionForm addFunc={addNewTransaction} />
                    <SavingsGoal
                        goalData={myGoal}
                        savedAmount={moneySaved}
                        updateFunc={updateMyGoal}
                    />
                </div>

                <div className="grid grid-2">
                    <SpendingChart data={myTransactions} />
                    <SavingsChart goalData={myGoal} savedAmount={moneySaved} />
                </div>

                <TransactionList list={myTransactions} />
            </main>
        </div>
    );
}

export default App;
