import React, { useState } from 'react';

const PricingPage = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [billPlan, setBillPlan] = useState('monthly');

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const toggleBillingPlan = () => {
    setBillPlan(billPlan === 'monthly' ? 'annually' : 'monthly');
  };

  const plans = [
    {
      name: 'Basic',
      price: { monthly: 19, annually: 190 },
      discretion: 'Perfect for individuals.',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
    },
    {
      name: 'Standard',
      price: { monthly: 49, annually: 490 },
      discretion: 'Ideal for small teams.',
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
    },
    {
      name: 'Premium',
      price: { monthly: 99, annually: 990 },
      discretion: 'Best for large organizations.',
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'],
    },
  ];

  return (
    <div className="container mx-auto antialiased text-gray-900 bg-white">

      <main className="mx-4 my-24">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-normal md:text-3xl lg:text-4xl">
            Our <span className="font-semibold">plans</span> for your <span className="font-semibold">strategies</span>
          </h1>
          <p className="text-sm font-normal text-gray-400">
            See below our main three plans for your business, for your startup and agency.
          </p>
          <p className="text-sm font-normal text-gray-400">
            It starts from here! You can teach yourself what you really like.
          </p>
        </div>

        {/* Plan Switch */}
        <div className="flex items-center justify-center mt-10 space-x-4">
          <span className="text-base font-medium">Bill Monthly</span>
          <button
            onClick={toggleBillingPlan}
            className="relative rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <div className="w-16 h-8 transition bg-indigo-500 rounded-full shadow-md outline-none"></div>
            <div
              className={`absolute inline-flex items-center justify-center w-6 h-6 transition-all duration-200 ease-in-out transform bg-white rounded-full shadow-sm top-1 left-1 ${billPlan === 'annually' ? 'translate-x-8' : 'translate-x-0'}`}
            ></div>
          </button>
          <span className="text-base font-medium">Bill Annually</span>
        </div>

        {/* Plans */}
        <div className="flex flex-col items-center justify-center mt-16 space-y-8 lg:flex-row lg:items-stretch lg:space-x-8 lg:space-y-0">
          {plans.map((plan, i) => (
            <section key={i} className="flex flex-col w-full max-w-sm p-12 space-y-6 bg-white rounded-lg shadow-md">
              {/* Price */}
              <div className="flex-shrink-0">
                <span className={`text-4xl font-medium tracking-tight ${plan.name === 'Basic' ? 'text-green-500' : ''}`}>
                  ${billPlan === 'monthly' ? plan.price.monthly : plan.price.annually}
                </span>
                <span className="text-gray-400">{billPlan === 'monthly' ? '/month' : '/year'}</span>
              </div>

              {/* Plan Description */}
              <div className="flex-shrink-0 pb-6 space-y-2 border-b">
                <h2 className="text-2xl font-normal">{plan.name}</h2>
                <p className="text-sm font-normal text-gray-400">{plan.discretion}</p>
              </div>

              {/* Plan Features */}
              <ul className="flex-1 space-y-4">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center">
                    <svg
                      className="w-6 h-6 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-base font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Get Started */}
              <button className="px-6 py-2 text-lg font-medium text-white bg-indigo-600 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-700">
                Get Started
              </button>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PricingPage;
