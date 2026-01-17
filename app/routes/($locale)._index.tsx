import type {Route} from './+types/($locale)._index';
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
import { useLoaderData } from 'react-router';
import type { HeroBannerProps } from '~/components/Homepage/Data/homepage.data';

import { fetchGoogleReviews, type SwaggerEnv } from '~/services/swagger.server';

export const meta: Route.MetaFunction = ({data, location}) => {
  // Use canonical URL from loader data, or construct from location
  const canonicalUrl = data?.seo?.canonical || location.pathname;

  return [
    {
      title: data?.seo?.title || 'Abelini - Buy Diamond Jewellery Online | UK Jewellers - Abelini',
    },
    {
      name: 'description',
      content: data?.seo?.description || 'Abelini is UK\'s leading online Jewellery store for Diamond Engagement Rings, Earrings, Bracelets, Pendants, Necklaces and Diamond Rings. All our jewellery is made in a well-established workshop by our in-house craftsmen.',
    },
    {
      rel: 'canonical',
      href: canonicalUrl,
    },
    ...(data?.seo?.noindex
      ? [
          {
            name: 'robots',
            content: 'noindex, nofollow',
          },
        ]
      : []),
  ];
};


export async function loader({context, request}: Route.LoaderArgs) {
  const url = new URL(request.url);
  const canonicalUrl = `${url.origin}${url.pathname}`;
  const swaggerEnv: SwaggerEnv = {
    SWAGGER_API_URL: context?.env?.SWAGGER_API_URL,
    SWAGGER_API_AUTH: context?.env?.SWAGGER_API_AUTH,
  };
  const reviewsData = await fetchGoogleReviews(swaggerEnv);
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
    heroBannerMetaobject: heroBannerMetaobject as HeroBannerProps,
    seo: {
      title: 'Abelini - Buy Diamond Jewellery Online | UK Jewellers - Abelini',
      description: 'Discover exquisite diamond jewellery at Abelini. Shop online for engagement rings, wedding rings, and fine jewellery. UK\'s premier jewellers with bespoke design services.',
      canonical: canonicalUrl,
      noindex: false, // Set to true if you want to prevent indexing
    },
    reviewsData : reviewsData
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