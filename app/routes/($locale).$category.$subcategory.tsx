import Breadcrumb from '~/components/Common/Breadcrumb';
import Hero from '~/components/Category/Hero';
import AbeliniFeatures from '~/components/Category/AbeliniFeatures';
import ProductsArea from '~/components/Category/ProductsArea';
import RingCategory from '~/components/Category/RingCategory';
import { breadcrumbs } from '~/components/Category/Data/category.data';

const CategoryPage = () => {
  return (
    <section className='bg-[#fcfcfc]'>
        
        <Breadcrumb items={breadcrumbs} />
        <Hero title='Solitaire Engagement Rings' length={146} description="Solitaire engagement rings are the epitome of timeless elegance. At Abelini, we believe this classic style should be as unique as your commitment. Our complimentary design service and in-house craftsmanship ensure your solitaire ring is a bespoke masterpiece of exceptional quality, all without the inflated markups you'd find on the high street."/>
        <AbeliniFeatures />
        <RingCategory />
        <ProductsArea />
    </section>
  );
};

export default CategoryPage;
