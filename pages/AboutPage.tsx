import React from 'react';
import { APP_NAME } from '../constants';

const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-primary" {...props}>
    <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.06 0l4-5.5Z" clipRule="evenodd" />
  </svg>
);

// Example icons for Core Values
const GlobeAltIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
);
const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L1.875 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L22.125 9l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L15 3l-2.846.813a4.5 4.5 0 0 0-3.09 3.09L9.875 6l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15 12Zm0 0-.813 2.846a4.5 4.5 0 0 0-3.09 3.09L9 21.75l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L15.75 15l2.5 2.25L18.25 12Z" />
    </svg>
);
const ShieldCheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.4-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.4-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.4 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.4.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
    </svg>
);


const AboutPage: React.FC = () => {
  return (
    <div className="bg-white shadow-xl rounded-xl p-6 md:p-10 lg:p-12 space-y-12 md:space-y-16 border border-neutral-light/50">
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">About {APP_NAME}</h1>
        <p className="text-lg md:text-xl text-text-light max-w-3xl mx-auto leading-relaxed">
          Your gateway to the enchanting landscapes and vibrant cultures of Northeast India.
        </p>
      </header>
      
      <section className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
        <div className="order-2 md:order-1 rounded-lg overflow-hidden shadow-lg">
          <img 
            src="https://nextjs.shrineyatra.com/wp-content/uploads/2021/07/North-East-Travel-Guide.jpg" 
            alt="Scenic view of Northeast India with hills and river" 
            className="w-full h-auto object-cover aspect-[4/3] transform hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div className="text-text space-y-5 order-1 md:order-2">
          <h2 className="text-3xl font-display font-semibold text-secondary mb-3">Our Story & Mission</h2>
          <p className="text-lg leading-relaxed">
            Welcome to {APP_NAME}! We are a team of passionate travelers and local experts dedicated to unveiling the hidden gems and rich cultural tapestry of this incredible part of the world.
          </p>
          <p className="leading-relaxed">
            Our mission is to provide authentic, immersive, and sustainable travel experiences. We believe in connecting travelers with the soul of Northeast India – its warm people, ancient traditions, and breathtaking natural beauty.
          </p>
          <p className="font-semibold text-text-dark mt-4">What makes {APP_NAME} special:</p>
          <ul className="space-y-2.5 text-text-light">
            {[
              "Curated tour packages showcasing the best of each state.",
              "Personalized itineraries tailored to your interests and travel style.",
              "Partnerships with local communities for authentic experiences.",
              "A commitment to responsible tourism that benefits local economies.",
              "In-depth travel guides and resources for your journey."
            ].map(item => (
              <li key={item} className="flex items-start">
                <CheckCircleIcon className="mr-2.5 mt-1 shrink-0 w-5 h-5 text-primary"/>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="text-text space-y-5 leading-relaxed bg-neutral-lightest p-6 md:p-8 rounded-lg shadow-md border border-neutral-light">
         <h2 className="text-3xl font-display font-semibold text-secondary mb-4 text-center md:text-left">The Magic of the North East</h2>
         <p>
            Northeast India, a collective name for the easternmost region of India, comprises eight states – Arunachal Pradesh, Assam, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim, and Tripura. Each state offers a unique blend of culture, landscapes, and adventure.
        </p>
        <p>
            From the snow-capped Himalayas and ancient monasteries of Arunachal and Sikkim to the living root bridges of Meghalaya, the wildlife sanctuaries of Assam, and the vibrant tribal cultures of Nagaland and Mizoram, there's a world of discovery awaiting you.
        </p>
        <p className="font-medium text-primary text-lg mt-3">
            Join us at {APP_NAME} as we take you on a journey through this less-explored paradise. Let us help you create memories that will last a lifetime. Your adventure into the heart of Northeast India starts here!
        </p>
      </section>


      <section className="py-8 md:py-12 border-t border-neutral-light">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-10 md:mb-12 text-center">Our Core Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          {[
            { icon: <SparklesIcon className="w-10 h-10 text-accent group-hover:scale-110 transition-transform duration-200"/>, title: "Authenticity", desc: "Providing genuine experiences that reflect the true spirit of Northeast India." },
            { icon: <GlobeAltIcon className="w-10 h-10 text-accent group-hover:scale-110 transition-transform duration-200"/>, title: "Sustainability", desc: "Promoting responsible travel that respects local cultures and environments." },
            { icon: <ShieldCheckIcon className="w-10 h-10 text-accent group-hover:scale-110 transition-transform duration-200"/>, title: "Expertise & Trust", desc: "Leveraging deep local knowledge to craft enriching, safe, and seamless journeys." }
          ].map(value => (
            <div key={value.title} className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 border border-transparent hover:border-primary/30 group">
              <div className="flex justify-center items-center mb-5 w-20 h-20 rounded-full bg-primary/10 mx-auto group-hover:bg-accent/10 transition-colors duration-200">
                {value.icon}
              </div>
              <h3 className="text-xl font-display font-semibold text-secondary mb-2">{value.title}</h3>
              <p className="text-text-light text-sm leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;