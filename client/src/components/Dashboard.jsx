import './Dashboard.css';

// Component for the top summary cards
export default function Dashboard({ data }) {

    // Get total income
    const income = data
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    // get total expenses
    const expenses = data
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    // balance is income - expenses
    const balance = income - expenses;

    // Helper to show money format
    const showMoney = (num) => {
        return '$' + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    };

    return (
        <section className="glass-panel grid-3">
            <div className="summary-card">
                <h3>Total Balance</h3>
                <h2 className="text-gradient">{showMoney(balance)}</h2>
            </div>
            <div className="summary-card">
                <h3>Income</h3>
                <h2 className="income-text">{showMoney(income)}</h2>
            </div>
            <div className="summary-card">
                <h3>Expenses</h3>
                <h2 className="expense-text">{showMoney(expenses)}</h2>
            </div>
        </section>
    );
}
