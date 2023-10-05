import { ComponentsCMS } from '@/domain/entities/content/content.types';
import Categories from '../Categories';
import CountdownSection from '../CountdownSection';
import QuickCategory from '../QuickCategory';
import AwsPersonalize from '../aws-personalize';
import Cards from './components/cards';
import Carousel from './components/carousel';
import InformationCard from './components/information-card';
import PromotionalRibbon from './components/promotional-ribbon';
import ShowCase from './components/show-case';
import SmartBanner from './components/smart-banner';

const ContentComponent: ComponentsCMS = {
  'banner-carousel': Carousel,
  cards: Cards,
  'aws-personalize': AwsPersonalize,
  showcase: ShowCase,
  'promotional-ribbon': PromotionalRibbon,
  'menu-carousel': Categories,
  'banner-countdown': CountdownSection,
  'information-card': InformationCard,
  'quick-category': QuickCategory,
  'smart-banner': SmartBanner,
};

export default ContentComponent;
