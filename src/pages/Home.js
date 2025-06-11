import React, { useState } from 'react';
import QrScanner from '../components/QrScanner';
import '../App.css';

const Home = () => {
  const [scanResult, setScanResult] = useState('');
  const [totalCount, setTotalCount] = useState(0);

  const handleScan = (data) => {
    setScanResult(data);
    setTotalCount((prev) => prev + 1);
  };

  return (
    <div className="scanner-container">
      <h2>Scan Equipment QR Code</h2>
      <QrScanner onScanSuccess={handleScan} />
      <div className="btn-group">
        <button onClick={() => alert('Add logic here')}>Add</button>
        <button onClick={() => alert('Issue logic here')}>Issue</button>
      </div>
      <p>Total Equipment Present: {totalCount}</p>
      {scanResult && <p>Last Scanned QR: {scanResult}</p>}
    </div>
  );
};

export default Home;
