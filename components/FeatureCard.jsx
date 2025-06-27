import React from 'react';
import PropTypes from 'prop-types';

const FeatureCard = ({ feature, getIconSymbol }) => {
  return (
    <div className="feature-card">
      <div
        className="feature-icon"
        data-icon={getIconSymbol(feature.icon)}
        aria-label={`${feature.title} icon`}
      ></div>
      <h3 className="feature-title">{feature.title}</h3>
      <p className="feature-description">{feature.description}</p>
    </div>
  );
};

FeatureCard.propTypes = {
  feature: PropTypes.shape({
    id: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  getIconSymbol: PropTypes.func.isRequired,
};

export default FeatureCard;
