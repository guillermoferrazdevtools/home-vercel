import styled, { css, RuleSet } from 'styled-components';

export const SwiperComponent = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const SwiperWrapper = styled.div`
  width: 100%;
`;

const bullet = css`
  .swiper-pagination-bullet {
    border: 1px solid #9d9ea0;
    background-color: #9d9ea0;
    width: 10px;
    height: 10px;
    border-radius: 4px;
    cursor: pointer;
  }
  .swiper-pagination-bullet-active {
    border: 1px solid #cc1515;
    background-color: #cc1515;
    width: 33px;
    height: 10px;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const dot = css`
  .swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet,
  .swiper-pagination-horizontal.swiper-pagination-bullets
    .swiper-pagination-bullet {
    margin: 0px 8px;
  }

  .swiper-pagination-bullet {
    border: 1px solid #9d9ea0;
    background-color: #9d9ea0;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    cursor: pointer;
  }
  .swiper-pagination-bullet-active {
    border-width: 1px;
    border-style: solid;
    border-color: #cc1515;
    background-color: #cc1515;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    outline: 2px solid #cc1515;
    outline-offset: 3px;
    cursor: pointer;
  }
`;

const paginationCss: Record<'dot' | 'bullet', RuleSet<object>> = {
  dot,
  bullet,
};

export const SwiperContainer = styled.div<{
  paginationstyle: 'dot' | 'bullet';
  isPrincipalSwiper?: boolean;
}>`
  ${(props) => paginationCss[props.paginationstyle]}
  .custom-pagination-container {
    height: 33px;
    background: transparent;
    border: none;
    display: flex;
    gap: 10px;
  }
  .swiper-wrapper {
    gap: ${(props) => (props.isPrincipalSwiper ? '0' : '8px')};
  }
`;
