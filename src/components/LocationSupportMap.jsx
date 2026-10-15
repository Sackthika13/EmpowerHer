import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Building, 
  Navigation, 
  Search, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { helpCenters } from '../data/HelpCenters';

const LocationSupportMap = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedCenter, setSelectedCenter] = useState(helpCenters[0]);

  const filteredCenters = helpCenters.filter(hc => 
    selectedDistrict === 'All' || hc.district === selectedDistrict
  );

  return (
    <section id="locations" className="section-padding">
      <div className="container">
        <div className="section-header text-center">
          <span className="feature-pill-tag">
            <MapPin size={14} /> Location-Based Support & Panchayat Help Centers
          </span>
          <h2>Find Nearby Service Centers & Panchayat Assistance</h2>
          <p className="section-desc">
            Visit nearby e-Sevai CSC kiosks, Panchayat offices, or Women Help Desks for staff-assisted scheme application & OCR verification.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="location-filter-bar glass-card">
          <div className="filter-group">
            <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Filter by District:</label>
            <select 
              className="form-input"
              style={{ width: '220px' }}
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
            >
              <option value="All">All Districts (Tamil Nadu)</option>
              <option value="Kanchipuram">Kanchipuram</option>
              <option value="Chengalpattu">Chengalpattu</option>
              <option value="Madurai">Madurai</option>
            </select>
          </div>
          <span className="count-tag">{filteredCenters.length} Assistance Hubs Found</span>
        </div>

        {/* Map + List Split View */}
        <div className="map-split-grid">
          {/* Centers List */}
          <div className="centers-list-wrap">
            {filteredCenters.map((center) => {
              const isSelected = selectedCenter?.id === center.id;
              return (
                <div 
                  key={center.id} 
                  className={`help-center-card glass-card ${isSelected ? 'active-center' : ''}`}
                  onClick={() => setSelectedCenter(center)}
                >
                  <div className="center-card-header">
                    <span className="center-type-badge">{center.type}</span>
                    <span className="distance-badge"><Navigation size={12} /> {center.distance}</span>
                  </div>

                  <h3 className="center-name">{center.name}</h3>
                  <p className="center-address"><MapPin size={14} /> {center.address}</p>

                  <div className="center-details-mini">
                    <span><Phone size={13} /> {center.phone}</span>
                    <span><Clock size={13} /> {center.timing}</span>
                  </div>

                  <div className="services-chips-row">
                    {center.services.map((srv, i) => (
                      <span key={i} className="service-chip">• {srv}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Map Visualizer */}
          <div className="map-visualizer-box glass-card">
            <div className="map-header">
              <Building size={18} color="var(--primary)" />
              <div>
                <h4 style={{ margin: 0 }}>Panchayat Map Navigation</h4>
                <span className="sub-text">Lat: {selectedCenter.coords.lat}, Lng: {selectedCenter.coords.lng}</span>
              </div>
            </div>

            <div className="interactive-map-canvas">
              {/* Simulated Map UI */}
              <div className="map-pins-overlay">
                <div className="map-pin-pulse active-pin" style={{ top: '40%', left: '48%' }}>
                  <MapPin size={32} color="#ff4d6d" fill="#ff4d6d" />
                  <div className="pin-tooltip">{selectedCenter.name} ({selectedCenter.distance})</div>
                </div>
                <div className="map-pin-pulse" style={{ top: '65%', left: '72%' }}>
                  <MapPin size={24} color="#7012ce" />
                </div>
                <div className="map-pin-pulse" style={{ top: '25%', left: '30%' }}>
                  <MapPin size={24} color="#2ec4b6" />
                </div>
              </div>

              <div className="map-routes-svg">
                <svg width="100%" height="100%">
                  <line x1="30%" y1="25%" x2="48%" y2="40%" stroke="var(--primary)" strokeWidth="3" strokeDasharray="5,5" />
                  <line x1="48%" y1="40%" x2="72%" y2="65%" stroke="#2ec4b6" strokeWidth="2" strokeDasharray="4,4" />
                </svg>
              </div>
            </div>

            <div className="map-actions-footer">
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${selectedCenter.coords.lat},${selectedCenter.coords.lng}`} 
                target="_blank" 
                rel="noreferrer"
                className="btn btn-primary btn-block"
              >
                <Navigation size={16} /> Open Directions in Google Maps <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSupportMap;
