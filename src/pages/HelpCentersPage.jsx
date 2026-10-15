import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Building, 
  Navigation, 
  Search, 
  ExternalLink 
} from 'lucide-react';
import { helpCenters } from '../data/HelpCenters';

const HelpCentersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredCenters = helpCenters.filter(center => {
    const matchesSearch = center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          center.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = selectedDistrict === 'All' || center.district === selectedDistrict;
    const matchesCategory = selectedCategory === 'All' || center.type.includes(selectedCategory);
    return matchesSearch && matchesDistrict && matchesCategory;
  });

  return (
    <div className="help-centers-page-container">
      <div className="page-header-title">
        <h2>Panchayat Help Centers & Assistance Hubs</h2>
        <p className="subtitle-text">Visit nearby e-Sevai CSC kiosks, Panchayat offices, or Women Help Desks for staff-assisted scheme application.</p>
      </div>

      {/* Filter Panel */}
      <div className="filter-panel-card glass-card" style={{ marginBottom: '24px' }}>
        <div className="search-bar-wrap">
          <Search size={18} color="#666" />
          <input 
            type="text" 
            placeholder="Search help center by name, address, Kanchipuram..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-controls-row">
          <div className="filter-group">
            <label>District Filter:</label>
            <select className="form-input" value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}>
              <option value="All">All Districts (Tamil Nadu)</option>
              <option value="Kanchipuram">Kanchipuram</option>
              <option value="Chengalpattu">Chengalpattu</option>
              <option value="Madurai">Madurai</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Center Type:</label>
            <select className="form-input" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="All">All Center Types</option>
              <option value="Panchayat">Government / Panchayat Office</option>
              <option value="e-Sevai">e-Sevai / CSC Center</option>
              <option value="Women">Women Empowerment Hub</option>
              <option value="NGO">NGO Support</option>
            </select>
          </div>

          <span className="results-count-pill">{filteredCenters.length} Hubs Found</span>
        </div>
      </div>

      {/* Centers Cards Grid */}
      <div className="schemes-grid">
        {filteredCenters.map((center) => (
          <div key={center.id} className="help-center-card glass-card hover-lift">
            <div className="center-card-header">
              <span className="center-type-badge">{center.type}</span>
              <span className="distance-badge"><Navigation size={12} /> {center.distance}</span>
            </div>

            <h3 className="center-name" style={{ margin: '8px 0 4px' }}>{center.name}</h3>
            <p className="center-address" style={{ fontSize: '0.88rem', color: '#555', marginBottom: '12px' }}>
              <MapPin size={14} color="var(--primary)" /> {center.address}
            </p>

            <div className="center-details-mini" style={{ marginBottom: '14px' }}>
              <p><Phone size={13} /> Phone: <strong>{center.phone}</strong></p>
              <p><Clock size={13} /> Hours: <strong>{center.timing}</strong></p>
            </div>

            <div className="services-chips-row" style={{ marginBottom: '20px' }}>
              {center.services.map((srv, i) => (
                <span key={i} className="service-chip">• {srv}</span>
              ))}
            </div>

            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${center.coords.lat},${center.coords.lng}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary btn-block btn-sm"
              style={{ textDecoration: 'none' }}
            >
              <Navigation size={14} /> Get Directions in Maps <ExternalLink size={12} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpCentersPage;
