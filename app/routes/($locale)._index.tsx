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

export const meta: Route.MetaFunction = () => {
  return [{title: 'Abelini - Homepage Demo'}];
};


export default function Homepage() {
  return (
    <>
    <HeroBanner />
    <CategorySection />
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