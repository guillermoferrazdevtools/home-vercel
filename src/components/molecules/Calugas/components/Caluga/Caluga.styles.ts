import Image from 'next/image';
import Link from 'next/link';
import styled, { css } from 'styled-components';

type ContainerWidth = {
    width?: string;
}

export const CalugaContainer = styled.div<ContainerWidth>`
    display: flex;
    width: ${(props) => (props?.width ? props?.width : '50%')};
    cursor: pointer;
    background-color: #fff;


  @media (max-width: 768px) {
    ${(props) =>
    props?.width === '25%'
      ? css`
          width: 50%;
        `
      : css`
          width: 100%;
    `};    
  }
`;

export const LinkCaluga = styled(Link)`
    width: 100%;
`;

export const  ImageCaluga = styled(Image)`
    width: 100%;
    height: auto;
    padding: 5px;
    border-radius: 8px;
    
    &:hover {
        filter: brightness(80%);
  }

  @media (min-width: 768px) {
    padding: .5rem;
    &:hover {
        transform: scale(.95);
        box-shadow: 0 1px 8px rgba(100, 100, 100, 0.2);
  }
  }
`;