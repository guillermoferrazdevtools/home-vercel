/* eslint-disable @next/next/no-img-element */
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { CategoriesStruct, ItemStruct } from './Categories.types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Scrollbar, Navigation, Pagination } from 'swiper/modules';
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIos,
} from 'react-icons/md';
import useBreakpoints from '@/presentation/hooks/useBreakpoints';
import Link from 'next/link';
import useLinks from '@/presentation/hooks/useLink';
import useAnalytics from '@/presentation/hooks/useAnalytics';
import useIsInViewport from '@/presentation/hooks/useIsInViewport';
import { Promotion } from '@/domain/entities/analytics/analytics';

import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';
import {
  ArrowButtonCircle,
  ContainerSwiperCircle,
  ItemCircle,
  ItemContainerCircle,
  ItemImageCircle,
  ItemTitleCircle,
} from './CategoiresCircle.styles';
import { handlePromotionsImpressions } from './helper/analytics';

const CategoriesCircle = (props: CategoriesStruct) => {
  const [swiper, setSwiper] = useState<any>(null);
  const { items, itemsPerRow } = props;
  const [dymanicItemsPerRow, setDynamicItemsPerRow] =
    useState<number>(itemsPerRow);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const { getLink } = useLinks();
  const { isMd, isLg, isSm } = useBreakpoints();
  const limitItemBreakpoint = 9;

  const {
    methods: { sendPromotionImpressionEvent },
  } = useAnalytics();
  const productRef = useRef<HTMLInputElement>(null);
  const { isIntersecting, observer } = useIsInViewport(productRef);

  const dynamicItems = useCallback(() => {
    if (isSm) return setDynamicItemsPerRow(itemsPerRow - 1);
    if (!isMd && !isSm && !isLg) return setDynamicItemsPerRow(3);
    if (isMd && !isSm && !isLg) return setDynamicItemsPerRow(itemsPerRow - 1);
    if (!isMd && !isSm && isLg) return setDynamicItemsPerRow(itemsPerRow);
  }, [isLg, isMd, isSm, itemsPerRow]);

  useEffect(() => {
    dynamicItems();
  }, [dynamicItems, isLg, isMd, isSm]);

  const HandleItemsToMark = (start: number, end: number) => {
    const itemsToMark: ItemStruct[] = items.slice(start, end);
    const promotionsToMark = itemsToMark.map((item, index) => {
      return handlePromotionsImpressions(item, index + start);
    });
    sendImpression(promotionsToMark);
  };

  const sendImpression = (promotions: Promotion[]) => {
    sendPromotionImpressionEvent({
      event: 'promotionsViews',
      ecommerce: {
        promoView: {
          promotions,
        },
      },
    });
  };

  // Mark when component is visible
  useEffect(() => {
    if (isIntersecting) {
      HandleItemsToMark(0, dymanicItemsPerRow);

      if (productRef.current) {
        observer.unobserve(productRef.current);
      }
    }
  }, [isIntersecting]);

  return (
    <Fragment>
      <ContainerSwiperCircle ref={productRef}>
        {props?.items?.length !== dymanicItemsPerRow && (
          <ArrowButtonCircle
            onClick={() => {
              swiper.slidePrev();
            }}
            disabled={!isEnd}
          >
            <MdOutlineArrowBackIos />
          </ArrowButtonCircle>
        )}
        <Swiper
          slidesPerView={dymanicItemsPerRow}
          onSwiper={(ev) => {
            setSwiper(ev);
          }}
          onSlideChange={(ev) => setIsEnd(ev?.isEnd)}
          slidesPerGroup={dymanicItemsPerRow}
          modules={[Keyboard, Scrollbar, Navigation, Pagination]}
          pagination={{
            clickable: true,
          }}
          onRealIndexChange={(e) => {
            HandleItemsToMark(e.realIndex, e.realIndex + dymanicItemsPerRow);
          }}
        >
          {items?.length > 0 &&
            items.map((item: ItemStruct, index: number) => (
              <SwiperSlide key={index}>
                <ItemContainerCircle>
                  <ItemCircle
                    style={{
                      width:
                        dymanicItemsPerRow > limitItemBreakpoint
                          ? '4.6rem'
                          : '5rem',
                      height:
                        dymanicItemsPerRow > limitItemBreakpoint
                          ? '4.6rem'
                          : '5rem',
                    }}
                  >
                    <Link href={getLink(item.link)}>
                      <ItemImageCircle
                        src={item.image}
                        alt={item.title}
                        style={{
                          width:
                            dymanicItemsPerRow > limitItemBreakpoint
                              ? '2.5rem'
                              : '3rem',
                          height:
                            dymanicItemsPerRow > limitItemBreakpoint
                              ? '2.5rem'
                              : '3rem',
                        }}
                      />
                    </Link>
                  </ItemCircle>
                  <ItemTitleCircle
                    style={{
                      fontSize:
                        dymanicItemsPerRow > limitItemBreakpoint
                          ? '0.6rem'
                          : '0.9rem',
                    }}
                  >
                    {item.title}
                  </ItemTitleCircle>
                </ItemContainerCircle>
              </SwiperSlide>
            ))}
          <div className="swiper-pagination-bullet custom-pagination-categories" />
        </Swiper>
        {props?.items?.length !== dymanicItemsPerRow && (
          <ArrowButtonCircle
            onClick={() => {
              swiper.slideNext();
            }}
            disabled={isEnd}
          >
            <MdOutlineArrowForwardIos />
          </ArrowButtonCircle>
        )}
      </ContainerSwiperCircle>
    </Fragment>
  );
};
export default CategoriesCircle;
