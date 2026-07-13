import React from 'react'
import Tittle from './Tittle'
import assets from '../assets/assets'

const Why = () => {

  const workData = [
    {
      title: "Verified Tractor Owners",
      description:
        "Connect with trusted tractor owners near your location for safe and reliable farming services.",
      image: assets.overbridge,
    },
    {
      title: "Instant Booking",
      description:
        "Book tractors in just a few clicks anytime and anywhere without any hassle.",
      image: assets.phone,
    },
    {
      title: "Affordable Pricing",
      description:
        "Enjoy transparent pricing with no hidden charges and budget-friendly tractor services.",
      image: assets.wheat,
    },
  ]

  return (
    <section
      id="why-choose"
      className=" scroll-mt-24 relative overflow-hidden mt-16 mx-4 sm:mx-8 lg:mx-16 xl:mx-24
      rounded-[40px] py-16 px-6 sm:px-12 lg:px-20
      bg-gradient-to-br
      from-orange-100
      via-pink-50
      to-sky-100
      dark:from-[#1B1A2E]
      dark:via-[#11213A]
      dark:to-[#0B3B32]"
    >

      {/* Background Glow */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-orange-400/30 rounded-full blur-3xl"></div>

      <div className="absolute top-10 right-0 w-72 h-72 bg-pink-400/25 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"></div>

      <div className="absolute -bottom-16 right-12 w-72 h-72 bg-cyan-300/25 rounded-full blur-3xl"></div>

      <div className="relative z-10 flex flex-col items-center gap-10">

        <Tittle
          tittle="Why Choose TractorRide AI"
          description="Experience a smarter way to book tractors with verified owners, transparent pricing, quick bookings, and dedicated support—all in one platform."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">

          {workData.map((work, index) => (

            <div
              key={index}
              className="group overflow-hidden rounded-3xl
              bg-white/70 dark:bg-[#16213E]/80
              backdrop-blur-xl
              border border-white/40 dark:border-white/10
              shadow-xl hover:shadow-2xl
              hover:-translate-y-3
              transition-all duration-500"
            >

              <div className="overflow-hidden">

                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-64 object-cover
                  group-hover:scale-110
                  transition-transform duration-700"
                />

              </div>

              <div className="p-6">

                <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-300">
                  {work.title}
                </h3>

                <p className="mt-4 text-gray-700 dark:text-gray-300 leading-7">
                  {work.description}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  )
}

export default Why