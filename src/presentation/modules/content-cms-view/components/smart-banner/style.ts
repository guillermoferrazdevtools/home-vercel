import Button from '@/presentation/components/atoms/Button';
import Link from 'next/link';
import styled from 'styled-components';

export const SmartBannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 10.4rem;
  min-height: 10.4rem;
  width: 100vw;
  padding: 1rem;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 5;
`;

export const SmartBannerInfoContainer = styled.div`
  h2 {
    font-size: 14px;
    line-height: 18px;
    font-weight: 400;
    color: #626262;
    margin: 5px 0 16px 12px;
  }
`;

export const SmartBannerBtnContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  gap: ${({ theme: { spacing } }) => spacing[200]};
`;

export const SmartBannerTitleContainer = styled.div`
  display: flex;
  align-items: center;

  h2 {
    font-size: 20px;
    line-height: 23px;
    font-weight: 500;
    color: #1a1a1a;
    margin-left: 0.5rem;
    margin-bottom: 7px;
  }

  img {
    width: 32px;
    height: 32px;
  }
`;

export const ButtonClose = styled(Button)`
  width: 50%;
  height: 40px;
  font-size: ${({ theme: { fontSize } }) => fontSize[200]};
  color: #333333;
  background-color: #fff;
  border: 1px solid #333333;
  font-weight: 600;

  &:hover {
    color: #333333;
    background-color: #fff;
    border: 1px solid #333333;
  }
`;

export const ButtonApp = styled(Link)`
  width: 50%;
  height: 40px;
  font-size: ${({ theme: { fontSize } }) => fontSize[200]};
  color: #f3f3f3;
  background-color: #333333;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme: { radius } }) => radius.sm};

  &:hover {
    color: #f3f3f3;
    background-color: #333333;
    border: 1px solid #f3f3f3;
  }
`;
