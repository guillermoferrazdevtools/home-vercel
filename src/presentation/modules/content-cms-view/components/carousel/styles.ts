import Image from 'next/image';
import styled from 'styled-components';

export const SwiperContainer = styled.div`
  height: 60vh;
  max-width: 1800px;
  margin: auto;
`;
export const ImageCarousel = styled.div`
  width: 100vw;
  height: 56vh;
  max-height: 436px;
  max-width: 1800px;
  position: relative;
  margin: auto;
`;

export const ImageDesktop = styled(Image)`
  display: block;
  @media (max-width: 1024px) {
    display: none;
  }
`;

export const ImageMobile = styled(Image)`
  display: block;
  @media (min-width: 1025px) {
    display: none;
  }
`;
