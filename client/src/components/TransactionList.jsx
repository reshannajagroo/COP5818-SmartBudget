import './TransactionList.css';



export default function TransactionList({ list }) {

    // simple money formatter
    const moneyFormat = (n) => {
        return '$' + n.toFixed(2);
    };

    return (
        <section className="glass-panel">
            <h3>Recent Transactions</h3>
            <ul className="transaction-list">
                {/* check if empty */}
                {list.length === 0 ? (
                    <li className="no-transactions">No transactions yet.</li>
                ) : (
                    // show first 10 items
                    list.slice(0, 10).map(item => {

                        let isInc = item.type === 'income';

                        // set color
                        let myClass = 'text-danger';
                        if (isInc) {
                            myClass = 'text-success';
                        }

                        let sign = '-';
                        if (isInc) {
                            sign = '+';
                        }

                        return (
                            <li key={item._id || item.id} className="glass-panel transaction-item">
                                <div>
                                    <div className="transaction-desc">{item.desc}</div>
                                    <div className="transaction-meta">
                                        {item.category} • {new Date(item.date).toLocaleDateString()}
                                    </div>
                                </div>
                                <div className={`transaction-amount ${myClass}`}>
                                    {sign}{moneyFormat(item.amount)}
                                </div>
                            </li>
                        );
                    })
                )}
            </ul>
        </section>
    );
}
