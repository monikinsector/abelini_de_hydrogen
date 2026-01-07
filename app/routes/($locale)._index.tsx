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
import {fetchGoogleReviews} from '~/lib/swagger';

// Type for review data
interface ReviewData {
  google_reviews?: Array<{
    rating: string | number;
    text: string;
    author: string;
  }>;
  google_total_review?: {
    total_review: number;
    percentage: number;
  };
  trust_shops_total_review?: {
    total_review: number;
    percentage: number;
  };
}

export const meta: Route.MetaFunction = () => {
  return [{title: 'Abelini - Homepage Demo'}];
};

export async function loader({context}: Route.LoaderArgs) {
  let googleReviewsData: ReviewData | null = null;
  
  try {
    const data = await fetchGoogleReviews(context.env);
    googleReviewsData = data as ReviewData;
  } catch (error) {
    console.error('Error loading Google reviews in loader:', error);
    // Don't throw - allow page to render without reviews
  }

  return {
    googleReviewsData,
  };
}

export default function Homepage() {
  const {googleReviewsData} = useLoaderData<typeof loader>();
  
  return (
    <>
    <HeroBanner />
    <CategorySection />
    <Review googleReviewsData={googleReviewsData} />
    <SpotlightSection />
    <AbeliniOccasion />
    <BespokeSection />
    <BookAppointmentSection />
    <WhyAbeliniSection />
    <OurStore />
    <UspIcons />
    </>
  );
}