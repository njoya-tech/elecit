import React from "react";

const LocationContact = () => {
  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-snug">
            Nos services sont accessibles dans tout{" "}
            <span className="text-[#00729B]">le territoire camerounais</span>,
            mais également dans toute{" "}
            <span className="text-[#00729B]">l’Afrique centrale.</span>
          </h2>
        </div>

        {/* Map */}
        <div className="w-full">
          <div className="w-full h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden rounded-lg shadow-sm border border-gray-200">
            <iframe
              title="ElecIT location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2814.197134536475!2d9.694893175496254!3d4.04576384926426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x106112f3e0320d23%3A0x23fe15b72c2ef043!2sElecIT%20Engineering%20Cameroon%20SARL!5e0!3m2!1sen!2scm!4v1765297890701!5m2!1sen!2scm"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationContact;
