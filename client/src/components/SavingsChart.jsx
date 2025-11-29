import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './SavingsChart.css';

// register chart components
ChartJS.register(ArcElement, Tooltip, Legend);



export default function SavingsChart({ goalData, savedAmount }) {

    // Check if goal exists
    if (!goalData || goalData.target === 0) {
        return (
            <section className="glass-panel">
                <h3>Savings Progress</h3>
                <p className="no-goal-message">
                    Set a savings goal to see your progress.
                </p>
            </section>
        );
    }

    // calc saved and remaining
    const saved = Math.max(0, savedAmount);
    const remaining = Math.max(0, goalData.target - saved);

    // data for chart
    const data = {
        labels: ['Saved', 'Remaining'],
        datasets: [
            {
                data: [saved, remaining],
                backgroundColor: [
                    'rgba(74, 222, 128, 0.8)',
                    'rgba(148, 163, 184, 0.3)',
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
                    label: function (context) {
                        let lbl = context.label || '';
                        let val = context.parsed || 0;

                        let pct = ((val / goalData.target) * 100).toFixed(1);

                        return `${lbl}: $${val.toFixed(2)} (${pct}%)`;
                    },
                },
            },
        },
    };

    // money helper
    const showMoney = (n) => {
        return '$' + n.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    };

    return (
        <section className="glass-panel">
            <h3>Savings Progress: {goalData.name}</h3>
            <p className="goal-progress-text">
                {showMoney(saved)} of {showMoney(goalData.target)}
            </p>
            <div className="chart-container">
                <Pie data={data} options={options} />
            </div>
        </section>
    );
}
