import { Image } from "@shopify/hydrogen";
import { Link } from "react-router";

const OurStores = () => {
  const storeLocations = [
    {
      image: "/assets/images/uk.png",
      address: "Abelini Ltd,14 St Cross Street,Hatton Garden, London, EC1N 8UN",
      country: "United Kingdom",
      link: "/",
      isLaunched: true
    },
    {
      image: "/assets/images/australia.png",
      address: "Abelini Pty Ltd Suite 804,365 Little Collins Street,Melbourne,VIC 3000",
      country: "Australia",
      link: "/",
      isLaunched: true
    },
    {
      image: "/assets/images/germany.png",
      address: "Coming soon",
      country: "Germany",
      link: "/",
      isLaunched: false
    },
  ]
  return (
    <section className="px-0 lg:px-4 py-4 flex flex-col bg-[#FCF4EC]">
      <div className="w-full">
        <div className="flex justify-center flex-col items-center w-full">
          <div className="w-full text-center mb-6 lg:mb-0 lg:w-10/12">
            <h2 className="text-[18px] sm:text-[34px] lg:text-[42px] font-bold text-[#111] my-4 tracking-[1px] capitalize"> Our Stores </h2>
            <p className="text-[11px] sm:text-sm font-light sm:font-regular tracking-[0.8px] sm:tracking-[1px] mb-2 leading-[18px] text-[#111111] text-center max-w-4xl mx-auto">
              Across our global showrooms, Abelini's experts guide you in finding or designing jewellery that reflects your story — crafted with precision,integrity, and lasting beauty at an exceptional value.
            </p>
          </div>
        </div>
        <div className="container mx-auto">
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 mt-12 gap-8">
  {storeLocations.map((store, index) => {
    return (
      <div
        key={index}
        className="flex flex-col items-center text-center h-full"
      >
        <Image
          src={store.image}
          alt={store.country}
          className="!w-8 mx-auto"
        />

        {/* Address: reserved height */}
        <h4 className="mt-6 font-thin min-h-[4.5rem]">
          {store.address}
        </h4>

        {/* Country: same horizontal line across cards */}
        <h4 className="mt-0 font-thin">
          {store.country}
        </h4>

        {/* Button: same baseline */}
        <div className="pt-6">
          <Link className="btn-black" to={store.link}>
            {store.isLaunched ? "Book An Appointment" : "Launching Soon"}
          </Link>
        </div>
      </div>
    );
  })}

  <div className="col-span-1">
    <Image src={"/assets/images/rutvi_img.jpg"} alt="Rutvi Image" className="!w-[264px] !object-cover !h-[218px]"/>
  </div>
</div>


        </div>
      </div>
    </section>
  );
}
export default OurStores;
