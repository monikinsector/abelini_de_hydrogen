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

  return {
    seo: {
      title: 'Abelini - Buy Diamond Jewellery Online | UK Jewellers - Abelini',
      description: 'Discover exquisite diamond jewellery at Abelini. Shop online for engagement rings, wedding rings, and fine jewellery. UK\'s premier jewellers with bespoke design services.',
      canonical: canonicalUrl,
      noindex: false, // Set to true if you want to prevent indexing
    },
  };
}

export default function Homepage() {
  
  return (
    <>
    <HeroBanner />
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
