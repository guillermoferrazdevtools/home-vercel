import { ContainerStruct } from '@/presentation/modules/n0/Calugas/Calugas.types';
import { Campaigns } from '../aws-personalize/aws-personalize.entity';

export enum ShapeTypes {
  CIRCLE = 'circle',
  SQUARE = 'square',
}

export type TextItems = {
  text: string;
  formatText: string;
};

export type ItemContent = {
  description: string;
  image: string;
  mobileImage: string;
  link: string;
  alt: string;
  rows: number;
  maxHeight: boolean;
  title: string;
  width: number;
  textItems: TextItems[];
  color: string;
  icon: string;
};

export type CountdownProducts = {
  image: string;
  item: string;
};

export type TitleTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

export type TextStruct = {
  title: string;
  titleTag: TitleTag;
  text: string;
};

type OnHoverStruct = {
  borderColor: string;
  textColor: string;
  bgColor: string;
  opacity: string;
  shadow: boolean;
};

export type AccordionContent = {
  content: string;
  title: string;
};

export type ItemsLegals = {
  title: string;
  accordions: AccordionContent[];
};

export interface ServicesStoreProps {
  name: string;
  image: string;
}

export interface StoreContent {
  forceClose: boolean;
  services: ServicesStoreProps[];
  address: string;
  mapLink: string;
  sunHolEndHour: string;
  sunHolStartHour: string;
  monSatEndHour: string;
  monSatStartHour: string;
  neighborhood: string;
  name: string;
}

export interface flatedStoreContent extends StoreContent {
  region: string;
}

export interface StoreServices {
  label: string;
  value: string;
}

export interface StoreInfo {
  stores: StoreContent[];
  region: string;
}

export interface StoreInformation {
  icon: string;
  borderColor: string;
  textColor: string;
  text: string;
}

export type ParagraphContainer = {
  subtile: string;
  link: string;
  subtituleFontsize: string;
  position: string;
  colorSubtitle: string;
  text: string;
  textFontsize: string;
  colorText: string;
};

export type ContentBody = {
  component: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
  alt: string;
  imageDesktop: string;
  imageMobile: string;
  link: string;
  backgroundColor: string;
  fullWidth: boolean;
  title: string;
  titleTag: TitleTag;
  isFooter: boolean;
  sliderOnMobileView: boolean;
  items: ItemContent[];
  desktop: boolean;
  mobile: boolean;
  pagination: boolean;
  clusterId: string;
  fieldName: 'clusterId' | 'sku' | 'productId';
  maxItems: number;
  shape: ShapeTypes;
  itemsPerRow: number;
  backgroundImage: string;
  headerColor: string;
  subtitle: string;
  type: string;
  productList: CountdownProducts[];
  categoryId: string;
  categoryIcon: string;
  backgroundCategory: string;
  redirectionIcon: string;
  backgroundContainer: string;
  campaignName: Campaigns;
  isEnable: string;
  storeLinkIos: string;
  storeLinkAndroid: string;
  hideTime: number;
  btnCancel: string;
  btnContinue: string;
  description: string;
  image: string;
  container: ContainerStruct[];
  text: string;
  bgColor: string;
  bolder: string;
  mobileImage: string;
  itemPerRow: number;
  onHover: OnHoverStruct;
  products: string;
  list: ItemsLegals[];
  declaration: string;
  timestamp: string;
  file: string;
  storeInfo: StoreInfo[];
  informations: StoreInformation[];
  paragraph: ParagraphContainer[];
  textAbove: TextStruct[];
};

export interface ContentCMS {
  eventName: string;
  viewName: string;
  content: ContentBody[];
}

type R<P = Record<string, never>> = React.FC<P>;

export interface ComponentsCMS {
  [key: string]: R<ContentBody>;
}
