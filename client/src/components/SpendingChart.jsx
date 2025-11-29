import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './SpendingChart.css';

// register the chart parts we need
ChartJS.register(ArcElement, Tooltip, Legend);



export default function SpendingChart({ data }) {

    // Group expenses by category
    const totals = data
        .filter(item => item.type === 'expense')
        .reduce((acc, item) => {
            // Start at 0 if new
            let curr = acc[item.category] || 0;

            // add amount
            acc[item.category] = curr + item.amount;

            return acc;
        }, {});

    // get labels and data
    const labels = Object.keys(totals);
    const amounts = Object.values(totals);

    // check if empty
    if (labels.length === 0) {
        return (
            <section className="glass-panel">
                <h3>Spending by Category</h3>
                <p className="no-data-message">
                    No expenses yet. Add some transactions to see your spending breakdown.
                </p>
            </section>
        );
    }

    // chart data
    const chartData = {
        labels: labels,
        datasets: [
            {
                data: amounts,
                backgroundColor: [
                    '#ffa2e9ff',
                    '#fdff77ff',
                    '#527e86ff',
                    '#006ce7fb',
                    '#8e4500ab',
                    '#009569ff',
                    '#40c6ffff',
                    '#6122c5ff',
                    '#c5226bff',
                ],
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 2,
            },
        ],
    };

    // options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#f8fafc',
                    padding: 15,
                    font: {
                        size: 12,
                    },
                },
            },
            tooltip: {
                callbacks: {
                    // show percent
                    label: function (context) {
                        let lbl = context.label || '';
                        let val = context.parsed || 0;

                        let total = context.dataset.data.reduce((a, b) => a + b, 0);
                        let pct = ((val / total) * 100).toFixed(1);

                        return `${lbl}: $${val.toFixed(2)} (${pct}%)`;
                    },
                },
            },
        },
    };

    return (
        <section className="glass-panel">
            <h3>Spending by Category</h3>
            <div className="chart-container">
                <Pie data={chartData} options={options} />
            </div>
        </section>
    );
}
