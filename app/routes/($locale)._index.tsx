import type {Route} from './+types/($locale)._index';
import {useLoaderData} from 'react-router';
import HeroBanner from '~/components/Homepage/HeroBanner';
import CategorySection from '~/components/Homepage/CategorySection';
import SpotlightSection from '~/components/Homepage/SpotlightSection';
import AbeliniOccasion from '~/components/Homepage/AbeliniOccasion';
import BespokeSection from '~/components/Homepage/BespokeSection';
import BookAppointmentSection from '~/components/Homepage/BookAppointmentSection';
import UspIcons from '~/components/Homepage/UspIcons';
import WhyAbeliniSection from '~/components/Homepage/WhyAbeliniSection';
import OurStore from '~/components/Homepage/OurStore';
import Review from '~/components/Common/Review';
import Instagram from '~/components/Common/Instagram';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Abelini - Buy Diamond Jewellery Online | UK Jewellers - Abelini'}];
};


export async function loader({context}: Route.LoaderArgs) {
  const {storefront} = context;
  
  // Fetch market metafields to get hero banner ID
  const marketData = await storefront.query(LOCALIZATION_MARKET_QUERY);
  const market = marketData.localization.market;
  const metafields: Record<string, string | null> = Object.fromEntries(
    (market.metafields || [])
      .filter((m: { key: string; value: string | null } | null | undefined): m is { key: string; value: string | null } => m !== null && m !== undefined)
      .map((m: { key: string; value: string | null }) => [m.key, m.value])
  );
  
  const heroBannerId = (JSON.parse(metafields.home_banner || '[]') as string[])[0] as string | undefined;
  
  let heroBannerMetaobject = null;
  if (heroBannerId) {
    const res = await storefront.query(METAOBJECT_QUERY, {
      variables: { id: heroBannerId },
    });
    
    if (res?.metaobject?.fields) {
      // Transform fields array into key-value object
      heroBannerMetaobject = Object.fromEntries(
        res.metaobject.fields.map((field: any) => [
          field.key,
          field.reference?.image ?? field.value
        ])
      );
    }
  }

  return {
    heroBannerMetaobject,
  };
}

export default function Homepage() {
  const {heroBannerMetaobject} = useLoaderData<typeof loader>();
  
  return (
    <>
    <HeroBanner data={heroBannerMetaobject} />
    <CategorySection />
    <Review />
    <SpotlightSection />
    <AbeliniOccasion />
    <BespokeSection />
    <BookAppointmentSection />
    <WhyAbeliniSection />
    <Instagram />
    <OurStore />
    <UspIcons />
    </>
  );
}

const LOCALIZATION_MARKET_QUERY = `#graphql
  query LocalizationMarket {
    localization {
      market {
        metafields(identifiers: [
          {namespace: "custom", key: "home_banner"}
        ]) {
          key
          value
        }
      }
    }
  }
`;


const METAOBJECT_QUERY = `#graphql
  query Metaobject($id: ID!) {
    metaobject(id: $id) {
      id
      type
      fields {
        key
        value
        reference {
          ... on MediaImage {
            image {
              url
              altText
              width
              height
            }
          }
        }
      }
    }
  }
`;