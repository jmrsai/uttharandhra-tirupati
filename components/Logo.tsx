
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10", size = 40 }) => {
  return (
    <div className={`relative inline-flex items-center justify-center rounded-full overflow-hidden shadow-lg ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: size, height: size }}
      >
        {/* Background Circle with Saffron Gradient */}
        <circle cx="50" cy="50" r="48" fill="url(#saffron_grad)" stroke="#EAB308" strokeWidth="4" />
        
        {/* Decorative Gold Ring Inner */}
        <circle cx="50" cy="50" r="44" stroke="#FDE047" strokeWidth="1" strokeOpacity="0.5" />

        {/* Temple Arch (Gopuram Style) */}
        <path
          d="M38 72H62V48C62 44.6863 59.3137 42 56 42H44C40.6863 42 38 44.6863 38 48V72Z"
          fill="white"
        />
        <path
          d="M35 72H65V75H35V72Z"
          fill="white"
        />
        <path
          d="M42 42L50 32L58 42H42Z"
          fill="white"
        />
        <circle cx="50" cy="30" r="2" fill="white" />

        {/* Inner Arch Details */}
        <path
          d="M44 72V52C44 48.6863 46.6863 46 50 46C53.3137 46 56 48.6863 56 52V72H44Z"
          fill="#ea580c"
        />

        {/* Sun Symbol */}
        <circle cx="50" cy="54" r="3" fill="white" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={angle}
            x1="50" y1="54"
            x2={50 + 5 * Math.cos((angle * Math.PI) / 180)}
            y2={54 + 5 * Math.sin((angle * Math.PI) / 180)}
            stroke="white"
            strokeWidth="1"
          />
        ))}

        {/* Deepam (Flame) */}
        <path
          d="M50 62C48 62 47 64 47 66C47 68 48.3431 69 50 69C51.6569 69 53 68 53 66C53 64 52 62 50 62Z"
          fill="white"
        />
        <path
          d="M50 64C49.5 64 49 65 49 66C49 67 49.5 67.5 50 67.5C50.5 67.5 51 67 51 66C51 65 50.5 64 50 64Z"
          fill="#ea580c"
        />

        <defs>
          <radialGradient id="saffron_grad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(50 50) rotate(90) scale(48)">
            <stop stopColor="#FB923C" />
            <stop offset="1" stopColor="#EA580C" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Logo;
