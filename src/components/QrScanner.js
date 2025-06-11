import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const QrScanner = ({ onScanSuccess }) => {
  const qrRegionId = 'qr-reader';
  const scannerRef = useRef(null);

  useEffect(() => {
    let html5QrCode = null;

    const startScanner = async () => {
      try {
        html5QrCode = new Html5Qrcode(qrRegionId);
        scannerRef.current = html5QrCode;

        await html5QrCode.start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText, decodedResult) => {
            onScanSuccess(decodedText);
          }
        );
      } catch (err) {
        console.error('QR Code scanning failed to start:', err);
      }
    };

    startScanner();

    return () => {
      const scanner = scannerRef.current;
      if (scanner && scanner._isScanning) {
        scanner
          .stop()
          .then(() => scanner.clear())
          .catch((err) => console.error('Error stopping scanner:', err));
      }
    };
  }, [onScanSuccess]);

  return (
    <div className="scanner-box">
      <div id={qrRegionId}></div>
    </div>
  );
};

export default QrScanner;
