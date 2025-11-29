import { useState } from 'react';
import './TransactionForm.css';



export default function TransactionForm({ addFunc }) {
    // Form state
    const [desc, setDesc] = useState('');
    const [amt, setAmt] = useState('');
    const [kind, setKind] = useState('expense');
    const [cat, setCat] = useState('General');

    // handle submit button click
    const submitForm = (e) => {
        e.preventDefault();

        // check if empty
        if (!amt || !desc) {
            return;
        }

        // make object
        const obj = {
            desc: desc,
            amount: parseFloat(amt),
            type: kind,
            category: cat
        };

        // send to parent
        addFunc(obj);

        // clear inputs
        setDesc('');
        setAmt('');
    };

    return (
        <section className="glass-panel">
            <h3>Add Transaction</h3>
            <form onSubmit={submitForm} className="transaction-form">
                <input
                    type="text"
                    placeholder="Description..."
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Amount"
                    step="0.01"
                    value={amt}
                    onChange={(e) => setAmt(e.target.value)}
                    required
                />
                <select value={kind} onChange={(e) => setKind(e.target.value)}>
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>
                <select value={cat} onChange={(e) => setCat(e.target.value)}>
                    <option value="General">General</option>
                    <option value="Food">Food</option>
                    <option value="Rent">Rent</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Transportation/Gas">Transportation/Gas</option>
                    <option value="Subscriptions/Entertainment">Subscriptions/Entertainment</option>
                    <option value="Savings">Savings</option>
                    <option value="Retirement">Retirement</option>
                </select>
                <button type="submit" className="btn">Add Transaction</button>
            </form>
        </section>
    );
}
