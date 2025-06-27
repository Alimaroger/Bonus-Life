import React from 'react';
import PropTypes from 'prop-types';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="testimonial-card">
      <div className="testimonial-avatar" aria-label={`${testimonial.name} avatar`}>
        {testimonial.image}
      </div>
      <div className="testimonial-content">
        <div className="stars" aria-label={`${testimonial.rating} out of 5 stars`}>
          {'★'.repeat(testimonial.rating)}
        </div>
        <p className="testimonial-text">
          "{testimonial.text}"
        </p>
        <div className="testimonial-author">
          <strong>{testimonial.name}</strong>
          <span className="testimonial-title">{testimonial.title}</span>
        </div>
      </div>
    </div>
  );
};

TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default TestimonialCard;
