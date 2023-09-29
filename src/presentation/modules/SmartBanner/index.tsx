import { ContentBody } from '@/domain/entities/content/content.types';
import Mobile from '@/presentation/components/layouts/Mobile';
import useLinks from '@/presentation/hooks/useLink';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  ButtonApp,
  ButtonClose,
  SmartBannerBtnContainer,
  SmartBannerContainer,
  SmartBannerInfoContainer,
  SmartBannerTitleContainer,
} from './SmartBanner.styles';
import useAnalytics from '@/presentation/hooks/useAnalytics';

const SmartBanner = ({
  hideTime,
  storeLinkIos,
  storeLinkAndroid,
  title,
  description,
  btnCancel,
  btnContinue,
  image,
  isEnable,
}: ContentBody) => {
  const { getLink, sendEvent } = useLinks();

  const MILLISECONDS = hideTime * 60 * 1000;
  const userOS: string = sessionStorage.getItem('OS')?.toLowerCase() || '';
  const isEnableOS = isEnable.split(',').includes(userOS.toUpperCase());
  const [canShowComponent, setCanShowComponent] = useState(isEnableOS);
  const {
    methods: { sendImpressionInteraction },
  } = useAnalytics();

  useEffect(() => {
    setTimeout(() => {
      setCanShowComponent(false);
    }, MILLISECONDS);
  }, [MILLISECONDS]);

  const navToStore = () => {
    return userOS === 'android' ? storeLinkAndroid : storeLinkIos;
  };

  const handleButtonClick = (btnText: string) => {
    sendImpressionInteraction({
      event: 'Interaccion',
      category: 'Interacción smart banner',
      action: 'Clic',
      tag: btnText,
    });
  };

  return (
    <Mobile>
      {canShowComponent && (
        <SmartBannerContainer>
          <SmartBannerInfoContainer>
            <SmartBannerTitleContainer>
              <Image alt="Easy logo" width={100} height={100} src={image} />
              <h2>{title}</h2>
            </SmartBannerTitleContainer>
            <h2> {description} </h2>
          </SmartBannerInfoContainer>

          <SmartBannerBtnContainer>
            <ButtonClose
              variant="contained"
              type="button"
              onClick={() => {
                setCanShowComponent(false);
                handleButtonClick(btnCancel);
              }}
            >
              {btnCancel}
            </ButtonClose>

            <ButtonApp
              href={getLink(navToStore())}
              onClick={(e) => {
                e.stopPropagation();
                handleButtonClick(btnContinue);
                sendEvent(navToStore());
              }}
            >
              {btnContinue}
            </ButtonApp>
          </SmartBannerBtnContainer>
        </SmartBannerContainer>
      )}
    </Mobile>
  );
};

export default SmartBanner;
