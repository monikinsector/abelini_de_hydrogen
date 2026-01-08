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
  return {};
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
