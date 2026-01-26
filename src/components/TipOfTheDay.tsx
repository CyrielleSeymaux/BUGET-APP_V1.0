import React from 'react';
import { useTipOfTheDay } from '../hooks/useTipOfTheDay';

export const TipOfTheDay = () => {
  const { currentTip, pickRandomTip } = useTipOfTheDay();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3 style={styles.title}>💡 Tip of the Day</h3>
        {currentTip && (
          <div style={styles.tipContent}>
            <p style={styles.tipText}>{currentTip.content}</p>
            <span style={styles.category}>{currentTip.category}</span>
          </div>
        )}
        <button onClick={pickRandomTip} style={styles.button}>
          Get Another Tip
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginBottom: '20px',
  } as React.CSSProperties,
  card: {
    padding: '15px',
    backgroundColor: '#f0f7ff',
    border: '2px solid #4a90e2',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  } as React.CSSProperties,
  title: {
    margin: '0 0 10px 0',
    fontSize: '18px',
    color: '#2c3e50',
  } as React.CSSProperties,
  tipContent: {
    marginBottom: '12px',
  } as React.CSSProperties,
  tipText: {
    margin: '0 0 8px 0',
    fontSize: '14px',
    color: '#34495e',
    lineHeight: '1.5',
  } as React.CSSProperties,
  category: {
    display: 'inline-block',
    padding: '4px 10px',
    backgroundColor: '#4a90e2',
    color: '#ffffff',
    fontSize: '12px',
    borderRadius: '4px',
    textTransform: 'capitalize',
  } as React.CSSProperties,
  button: {
    padding: '8px 16px',
    backgroundColor: '#4a90e2',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  } as React.CSSProperties,
};
