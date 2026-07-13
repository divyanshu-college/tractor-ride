import React from 'react'
import assets from '../assets/assets'
import Tittle from './Tittle';
import ServiceCard from './ServiceCard';

const Services = () => {

   const servicesData = [
  {
    title: "Instant Tractor Booking",
    description:
      "Book tractors quickly for ploughing, sowing, harvesting, and other farming needs.",
    icon: assets.phone,
  },
  {
    title: "Verified Tractor Owners",
    description:
      "Connect with trusted and verified tractor owners in your nearby area.",
    icon: assets.tractor2,
  },
  {
    title: "Affordable Pricing",
    description:
      "Get transparent and budget-friendly pricing with no hidden charges.",
    icon: assets.plant2,
  },
  {
    title: "24/7 Support",
    description:
      "Receive round-the-clock customer support for bookings and assistance.",
    icon: assets.path,
  },
];

  return (
   <div
  id='services'
  className=' scroll-mt-24 relative flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700 dark:text-white '
>

  <img
    src={assets.ground}
    alt=""
    className='absolute -top-28 -left-16 -z-10 dark:hidden'
  />

  <Tittle
    tittle="How can we help?"
    description="From field preparation to harvesting, we help farmers get the right tractor at the right time."
  />
  <div className='flex flex-col md:grid grid-cols-2'>
    {servicesData.map((service,index)=>(
        <ServiceCard  key={index} service={service} index={index}/>
    ))}
  </div>

</div>
  )
}

export default Services
