import styled ,{ css } from "styled-components";

export const ItemCircle = styled.div`
    width: 5rem;
    height: 5rem;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 20px 20px 20px; 
    cursor: pointer;
    filter: none; 
    backgroud-color: #fff;
    border: 1px solid #eaeaea;
    border-radius: 50%;
    margin: auto;
    box-shadow: 1px 3px 3px rgba(0,0,0,0.16);
    &:hover{
        background: #cc1515;
        transition: filter 0.3s ease;
        &>a img{
            filter: brightness(1000%);
            transition: filter 0.3s ease;
        }
        &>a h4{
            color: #fff;
            transition: filter 0.3s ease;
        }
    }
`;
export const ItemImageCircle = styled.img`
    width: 3rem;
    height: 3rem;
`;
export const  ItemContainerCircle = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
`;
export const ItemTitleCircle = styled.h4`
    color: black;
    font-size: 0.9rem;
    font-weight: 400;
    text-align: center;
    margin-top: 8px;
`;
export const ContainerSwiperCircle = styled.div`
    max-width: 81rem;
    width: initial;
    margin: auto;
    margin-bottom: 30px;
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    
`;
export const ArrowButtonCircle = styled.div<{disabled: boolean}>`
    ${(props) => props?.disabled ? 
        css `color: rgba(16, 16, 16, 0.3)` : css `color: black`};
    background: #fff;
    width: 52px;
    height: 52px;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 8px;
    margin-left: 7px;
    margin-right: 7px;
    &>svg{
        width: 30px;
        height: 30px;
    }
`;

