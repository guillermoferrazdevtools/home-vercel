/* eslint-disable @next/next/no-img-element */
import { ItemImpressionsProps } from '@/domain/entities/analytics/analytics';
import Skeleton from '@/presentation/components/atoms/Skeleton';
import useAnalytics from '@/presentation/hooks/useAnalytics';
import useBreakpoints from '@/presentation/hooks/useBreakpoints';
import useIsInViewport from '@/presentation/hooks/useIsInViewport';
import useLinks from '@/presentation/hooks/useLink';
import Link from 'next/link';
import { Slide } from 'pure-react-carousel';
import { Fragment, useEffect, useRef, useState } from 'react';
import { CarouselImageContainer } from './Carousel.styles';
import { getImage, haveImage, linkValue } from './helper';

const CarouselSlide = (props: ItemImpressionsProps) => {
  // Hooks
  const { isLg, isSm } = useBreakpoints();
  const { getLink, sendEvent } = useLinks();
  const {
    methods: { sendPromotionClickEvent },
  } = useAnalytics();
  const ref = useRef(null);
  const { isIntersecting, observer } = useIsInViewport(ref);
  const [isLoadImage, setIsLoadImage] = useState<boolean>(false);

  // Props
  const { index, item, handlePromotionsImpressions } = props;

  const promotions = [
    {
      id: 'Banner Full',
      name: `${item.title}`,
      creative: `${getImage(item, isLg, isSm)}`,
      position: `Banner Full ${index + 1}`,
    },
  ];

  const handleSlideClick = () => {
    sendPromotionClickEvent({
      event: 'promotionClick',
      ecommerce: {
        promoClick: {
          promotions,
        },
      },
    });
  };

  useEffect(() => {
    if (isIntersecting) {
      handlePromotionsImpressions?.(
        {
          image: item.mobileImage || '',
          alt: item.title || '',
        },
        index,
      );

      if (ref.current) {
        observer.unobserve(ref.current);
      }
    }
  }, [isIntersecting]);

  return (
    <Slide key={item.title} index={index}>
      <Link
        href={getLink(linkValue(item))}
        onClick={(e) => {
          e.stopPropagation();
          handleSlideClick();
          sendEvent(linkValue(item));
        }}
        ref={ref}
      >
        <CarouselImageContainer>
          {haveImage(item) && (
            <Fragment>
              <img
                src={getImage(item, isLg, isSm)}
                alt={item.title}
                onLoad={() => setIsLoadImage(true)}
                style={{ display: !isLoadImage ? 'none' : '' }}
              />
              {!isLoadImage && <Skeleton />}
            </Fragment>
          )}
        </CarouselImageContainer>
      </Link>
    </Slide>
  );
};

export default CarouselSlide;
