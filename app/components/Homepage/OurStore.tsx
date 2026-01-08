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
    <section className="flex flex-col bg-[#FCF4EC]">
      <div className="container px-4 my-6">
        <div className="flex justify-center flex-col items-center w-full">
          <div className="w-full text-center mb-6 lg:mb-0 lg:w-10/12">
            <h2 className="text-h2 font-bold text-primary my-4 tracking-wider capitalize"> Our Stores </h2>
            <p className="text-p-14 font-light tracking-wider mb-2 text-center max-w-4xl mx-auto">
              Across our global showrooms, Abelini's experts guide you in finding or designing jewellery that reflects your story — crafted with precision,integrity, and lasting beauty at an exceptional value.
            </p>
          </div>
        </div>
        <div className="mx-auto">
          <div className="my-6 grid grid-cols-1 md:grid-cols-4 gap-6">
            {storeLocations.map((store, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center h-full lg:order-1 order-2 gap-4"
                >
                  <Image
                    src={store.image}
                    alt={store.country}
                    className="!w-8 mx-auto"
                  />

                  {/* Address: reserved height */}
                  <p className="text-p-14 font-light lg:min-h-[4.5rem]">
                    {store.address}
                  </p>

                  {/* Country: same horizontal line across cards */}
                  <p className="text-p-14 font-light">
                    {store.country}
                  </p>

                  {/* Button: same baseline */}
                  <Link className="btn-black" to={store.link}>
                    {store.isLaunched ? "Book An Appointment" : "Launching Soon"}
                  </Link>
                </div>
              );
            })}

          <div className="lg:order-2 order-1 col-span-1">
            <Image src={"/assets/images/rutvi_img.jpg"} alt="Rutvi Image" className="object-cover h-[218px]"/>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
export default OurStores;
