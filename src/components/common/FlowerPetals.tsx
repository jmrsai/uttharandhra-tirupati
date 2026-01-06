
import { useEffect } from 'react';
import '../../Flower.css';

const FlowerPetals = () => {
  useEffect(() => {
    const createPetal = () => {
      const petal = document.createElement('div');
      petal.classList.add('flower-petal');
      petal.style.left = `${Math.random() * 100}vw`;
      petal.style.animationDuration = `${Math.random() * 5 + 8}s`; // Duration between 8s and 13s
      petal.style.animationDelay = `${Math.random() * 3}s`;
      document.body.appendChild(petal);

      // Remove petal after it falls
      setTimeout(() => {
        petal.remove();
      }, 13000);
    };

    const interval = setInterval(createPetal, 400); // Create a new petal every 400ms

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default FlowerPetals;
