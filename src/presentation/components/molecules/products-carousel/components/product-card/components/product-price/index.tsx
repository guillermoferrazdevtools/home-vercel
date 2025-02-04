import { calculateDiscount, formatPrice } from '@/presentation/hooks/utils';
import { Container, DiscountPercentage, OldPrice, Price, Row } from './style';

type Props = {
  price?: number;
  oldPrice?: number;
};

const ProductPrice = ({ price = 0, oldPrice = 0 }: Props) => {
  const haveDiscount = () => {
    return price && oldPrice && price !== oldPrice;
  };

  return (
    <Container>
      <Row>
        {price && <Price>${formatPrice(price)}</Price>}
        {haveDiscount() && (
          <DiscountPercentage>
            {calculateDiscount(price, oldPrice)}%
          </DiscountPercentage>
        )}
      </Row>
      {oldPrice && (
        <OldPrice>
          {haveDiscount() && `Normal: $${formatPrice(oldPrice)}`}
        </OldPrice>
      )}
    </Container>
  );
};

export default ProductPrice;
