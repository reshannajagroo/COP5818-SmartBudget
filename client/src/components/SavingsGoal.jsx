import { useState, useEffect } from 'react';
import './SavingsGoal.css';

export default function SavingsGoal({ goalData, savedAmount, updateFunc }) {
    // Form state
    const [gName, setGName] = useState('');
    const [gTarget, setGTarget] = useState('');

    // Load goal if we have one
    useEffect(() => {
        if (goalData) {
            setGName(goalData.name);
            setGTarget(goalData.target);
        }
    }, [goalData]);

    // save the goal
    const saveGoal = (e) => {
        e.preventDefault();

        if (!gTarget || !gName) {
            return;
        }

        updateFunc({
            name: gName,
            target: parseFloat(gTarget)
        });
    };

    // percentage calcuation
    let percent = 0;
    if (goalData) {
        let raw = (savedAmount / goalData.target) * 100;
        percent = Math.min(raw, 100);
    }

    // money helper
    const showMoney = (n) => {
        return '$' + n.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    };

    return (
        <section className="glass-panel">
            <h3>Savings Goal</h3>
            <div className="savings-goal-container">
                <div className="savings-goal-header">
                    <span>Goal: {goalData ? goalData.name : 'Set a Goal'}</span>
                    <span>
                        {showMoney(savedAmount)} / {goalData ? showMoney(goalData.target) : '$0.00'}
                    </span>
                </div>

                {/* progress bar */}
                <div className="progress-bar-container">
                    <div
                        className="progress-bar"
                        style={{ width: `${Math.max(0, percent)}%` }}
                    ></div>
                </div>

                <form onSubmit={saveGoal} className="savings-goal-form">
                    <input
                        type="text"
                        placeholder="Goal Name"
                        value={gName}
                        onChange={(e) => setGName(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Target Amount"
                        step="0.01"
                        value={gTarget}
                        onChange={(e) => setGTarget(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn btn-secondary">Set Goal</button>
                </form>
            </div>
        </section>
    );
}
