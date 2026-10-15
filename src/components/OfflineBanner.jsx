import React from 'react';
import { WifiOff, RefreshCw, CheckCircle, Shield } from 'lucide-react';

const OfflineBanner = ({ isOffline, setIsOffline, offlineQueueCount, onSyncNow }) => {
  if (!isOffline && offlineQueueCount === 0) return null;

  return (
    <div className={`offline-status-banner ${isOffline ? 'is-offline-mode' : 'is-syncing'}`}>
      <div className="container banner-inner">
        <div className="banner-text-group">
          {isOffline ? (
            <>
              <WifiOff size={18} />
              <span>
                <strong>Offline Rural Mode Active:</strong> All forms, OCR tools & scheme databases are saved locally in PWA cache. You can continue submitting applications without internet!
              </span>
            </>
          ) : (
            <>
              <RefreshCw size={18} className="spin-icon" />
              <span>
                <strong>Connection Restored:</strong> You have {offlineQueueCount} offline applications queued for cloud sync.
              </span>
            </>
          )}
        </div>

        <div className="banner-btn-group">
          {offlineQueueCount > 0 && (
            <button className="btn btn-sm btn-sync" onClick={onSyncNow}>
              <RefreshCw size={14} /> Sync {offlineQueueCount} Submissions
            </button>
          )}
          <button 
            className="btn btn-sm btn-outline-white"
            onClick={() => setIsOffline(!isOffline)}
          >
            {isOffline ? "Switch Online" : "Dismiss"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfflineBanner;
