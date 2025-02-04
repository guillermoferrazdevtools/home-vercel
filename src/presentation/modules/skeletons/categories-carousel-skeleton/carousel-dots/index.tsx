import React from 'react';
import { CarouselDotsContainer, Dot } from './style';

const CarouselDots = () => {
  return (
    <CarouselDotsContainer>
      {[...Array(2)].map((dot, i) => (
        <Dot index={i} key={`carousel-dot-skeleton-${i}`}></Dot>
      ))}
    </CarouselDotsContainer>
  );
};

export default CarouselDots;
