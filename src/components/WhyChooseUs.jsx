import React from 'react';
import './WhyChooseUs.css';

/**
 * Why Choose Us Component
 * 
 * Displays key features/benefits in icon cards
 */
const WhyChooseUs = () => {
  const features = [
    {
      icon: '👨‍🏫',
      title: 'Small Batch Size',
      description: '6-8 students per batch'
    },
    {
      icon: '👩‍🎓',
      title: 'Individual Attention',
      description: 'Personalized learning approach'
    },
    {
      icon: '👨‍💼',
      title: 'Homework Support',
      description: 'Daily homework assistance'
    },
    {
      icon: '🎯',
      title: 'Concept Based Learning',
      description: 'Strong foundation building'
    }
  ];

  return (
    <section className="why-choose-us">
      <div className="container">
        <h2 className="why-choose-us__title">Why Choose Us?</h2>
        <div className="why-choose-us__grid">
          {features.map((feature, index) => (
            <div key={index} className="why-choose-us__card">
              <div className="why-choose-us__icon">{feature.icon}</div>
              <h3 className="why-choose-us__card-title">{feature.title}</h3>
              <p className="why-choose-us__description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
