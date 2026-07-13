import React from "react";
import Tittle from "./Tittle";
import assets from "../assets/assets";
import toast from "react-hot-toast";
const ContactUs = () => {

  const onSubmit  =async(event)=>{
    event.preventDefault();
    
    const formData = new FormData(event.target);

    formData.append("access_key", "0dd54b6f-db38-4ccb-8ebf-0293c2676847");


      try{
           
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
        toast.success('Thankyou for your submission');
     
      event.target.reset();
    } else {
      toast.error(data.message)
    }
      }  catch(error){
        toast.error(data.message)
      }
}
  return (
    <section
      id="contact"
      className="scroll-mt-24 py-20 px-4 sm:px-8 lg:px-16 xl:px-24"
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white">
            Reach Out To Us
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Have questions or need assistance? We'd love to hear from you.
            Fill out the form below and our team will get back to you as soon
            as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Contact Form */}

          <div
            className="
            rounded-3xl
            p-8
            bg-gradient-to-br
            from-emerald-100
            via-lime-50
            to-sky-100
            dark:from-[#14241C]
            dark:via-[#173528]
            dark:to-[#132A42]
            border border-white/20
            backdrop-blur-xl
            shadow-2xl
            "
          >
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              Send us a Message
            </h3>

            <form onSubmit ={onSubmit}className="space-y-5">

              <input name="name"
                type="text"
                placeholder="👤 Full Name"
                className="w-full rounded-xl bg-white/70 dark:bg-white/10 border border-green-200 dark:border-green-700 px-5 py-4 outline-none focus:ring-2 focus:ring-green-400"
              />

              <input name="email"
                type="email"
                placeholder="📧 Email Address"
                className="w-full rounded-xl bg-white/70 dark:bg-white/10 border border-green-200 dark:border-green-700 px-5 py-4 outline-none focus:ring-2 focus:ring-green-400"
              />

              <input name="message"
                type="text"
                placeholder="📍 Your Location"
                className="w-full rounded-xl bg-white/70 dark:bg-white/10 border border-green-200 dark:border-green-700 px-5 py-4 outline-none focus:ring-2 focus:ring-green-400" required
              />

              <textarea
                rows="6"
                placeholder="💬 Write your message..."
                className="w-full rounded-xl bg-white/70 dark:bg-white/10 border border-green-200 dark:border-green-700 px-5 py-4 outline-none resize-none focus:ring-2 focus:ring-green-400"
              ></textarea>

              <button
                className="
                w-full
                py-4
                rounded-xl
                font-semibold
                text-white
                bg-gradient-to-r
                from-green-500
                via-emerald-500
                to-sky-500
                hover:scale-105
                transition-all
                duration-300
                "
              >
                🚜 Send Message
              </button>

            </form>

          </div>

          {/* Google Map */}

          <div className="overflow-hidden rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">

            <iframe
              title="Google Map"
              src="https://www.google.com/maps?q=Chandigarh%20University&output=embed"
              className="w-full h-[600px]"
              loading="lazy"
            ></iframe>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactUs;