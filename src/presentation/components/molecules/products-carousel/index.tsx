import { ProductAnalytics } from '@/domain/entities/analytics/analytics';
import Container from '@/presentation/components/atoms/Container';
import Title from '@/presentation/components/atoms/Title';
import useAnalytics from '@/presentation/hooks/useAnalytics';
import useBreakpoints from '@/presentation/hooks/useBreakpoints';
import { useEffect, useState } from 'react';
import { CarouselContainer } from './styles';
import getSlidesPerView from './validations/get-slides-per-view';
import { Product } from '@cencosud-ds/easy-design-system';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { removeBaseUrl } from '@/domain/helpers/removeBaseUrl';
import SwiperBit from '../../atoms/Swiper';

const baseUrlToRemove = 'https://easyclqa.myvtex.com';

interface CustomProduct extends Product {
  link?: string;
}

interface Props {
  items: Product[];
  title?: string;
}

const Card = dynamic(
  () =>
    import('@ccom-easy-design-system/molecules.product-card').then(
      (module) => module.ProductCard,
    ),
  { ssr: false, loading: () => <></> },
);

const ProductsCarousel = ({ items, title }: Props) => {
  const [productsToMark, setProductsToMark] = useState<ProductAnalytics[]>([]);
  const router = useRouter();

  const { device } = useBreakpoints();
  const {
    methods: { sendImpressionsEvent },
  } = useAnalytics();

  useEffect(() => {
    if (productsToMark.length > 0) {
      sendImpressionsEvent({
        event: 'impressions',
        ecommerce: {
          impressions: productsToMark,
          currencyCode: 'CLP',
        },
      });
      setProductsToMark([]);
    }
  }, [productsToMark]);

  const handleOnClickButton = ({
    variantId,
    product,
  }: {
    variantId: string;
    product: Product;
  }) => {
    const productSelected = {
      id: variantId,
      quantity: 1,
      ...product,
    };

    document.dispatchEvent(
      new CustomEvent('ADD_ITEM_SHOPPING_CART', {
        detail: { product: productSelected },
      }),
    );
  };

  // function handleProductImpression(item: Product, position: number) {
  //   const product = {
  //     ...itemProperties(item),
  //     price: item?.items?.[0].sellers?.[0].commertialOffer?.Price || 0,
  //     position: position,
  //     quantity: 1,
  //   };

  //   setProductsToMark((prev) => [...prev, product]);
  // }

  const renderItem = (item: CustomProduct | unknown) => (
    <Card
      onClickButton={handleOnClickButton}
      product={item as Product}
      onClickCard={() =>
        router.push(
          removeBaseUrl((item as CustomProduct)?.link || '/', baseUrlToRemove),
        )
      }
      layout="grid"
      renderImage={() => (
        <Image
          quality={100}
          src={(item as Product).imageUrl}
          alt={(item as Product).productName}
          width={450}
          height={333}
        />
      )}
    />
  );

  return (
    <Container>
      <CarouselContainer>
        <Title text={title} />
        <SwiperBit
          items={items}
          renderItem={renderItem}
          slidesPerView={getSlidesPerView(device)}
          slidesPerGroup={1}
          hasActionButton={items.length !== getSlidesPerView(device)}
          isPositionAbsoluteButtons={device !== 'Desktop'}
          spaceBetween={18}
        />
      </CarouselContainer>
    </Container>
  );
};

export default ProductsCarousel;
