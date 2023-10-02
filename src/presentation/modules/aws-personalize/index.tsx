import {
  AwsPersonalizeBody,
  Campaigns,
} from '@/domain/entities/aws-personalize/aws-personalize.entity';
import getProductsAws from '@/domain/use-cases/aws-personalize/get-products';
import getRemoteConfigAwsPersonalize from '@/domain/use-cases/aws-personalize/get-remote-config-aws';
import getSkusAws from '@/domain/use-cases/aws-personalize/get-skus';
import CarouselProducts from '@/presentation/components/molecules/carousels/products';
import useUserOrderForm from '@/presentation/hooks/useUserOrderForm';
import React from 'react';
import { useQuery } from 'react-query';

export interface AwsPersonalizeProps {
  campaignName: Campaigns;
  title: string;
}

const AwsPersonalize: React.FC<AwsPersonalizeProps> = ({
  campaignName,
  title,
}) => {
  const { getUserId } = useUserOrderForm();

  const { data: awsPersonalize, isLoading: isLoadingRemoteConfig } = useQuery(
    ['aws-personalize'],
    getRemoteConfigAwsPersonalize,
  );

  const { data: skus, isLoading: isLoadingSkus } = useQuery(
    ['skus-aws'],
    () => {
      if (awsPersonalize) {
        const request: AwsPersonalizeBody = {
          ...awsPersonalize[campaignName],
          userId: getUserId(),
        };
        return getSkusAws(request);
      }
    },
    {
      enabled: !!awsPersonalize,
    },
  );

  const { data: products, isLoading: isLoadingProducts } = useQuery(
    ['products-aws', skus],
    () => {
      if (skus) {
        return getProductsAws(skus);
      }
    },
    { enabled: !!skus },
  );

  if (isLoadingRemoteConfig || isLoadingSkus || isLoadingProducts)
    return <div>Loading AWS...</div>;

  if (!products) return null;

  return (
    <div>
      <CarouselProducts
        products={products}
        title={title}
        onAddToCart={() => {}}
      />
    </div>
  );
};

export default AwsPersonalize;
