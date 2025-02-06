import Image from 'next/image' // Next.js Image component for optimized and responsive images
import Link from 'next/link' // Next.js Link for page navigation
import { integralCF } from '@/app/ui/fonts' // Custom font import for the hero section
import { cn } from '@/lib/utils' // Utility function for dynamic class management

// Hero Section Component
export function Hero() {
  return (
    <section className="w-full bg-[#F2F0F1] min-h-screen">
      {/* Container for layout: flex column on mobile, row on large screens */}
      <div className="flex flex-col lg:flex-row items-center max-w-[1400px] mx-auto">

        {/* Left side - Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 lg:px-20 py-12 lg:py-20">
          {/* Hero Heading */}
          <h1 className={cn(
            "text-[38px] md:text-[56px] lg:text-[58px] font-bold leading-[1.1]",
            integralCF.className // Applying custom font
          )}>
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>

          {/* Supporting paragraph */}
          <p className="mt-6 text-gray-600 text-lg max-w-[480px]">
            Browse through our diverse range of meticulously crafted garments, 
            designed to bring out your individuality and cater to your sense of style.
          </p>

          {/* Call-to-Action Button */}
          <Link
            href="/products" // Links to the products page
            className="mt-8 px-12 py-4 bg-black text-white rounded-full font-medium hover:bg-gray-900 transition-colors w-fit text-base"
          >
            Shop Now
          </Link>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-4 mt-12">
            {/* Stat 1: International Brands */}
            <div className="text-center">
              <div className="font-bold text-xl lg:text-2xl">200+</div>
              <div className="text-sm text-gray-600">International Brands</div>
            </div>
            {/* Stat 2: High-Quality Products */}
            <div className="text-center">
              <div className="font-bold text-xl lg:text-2xl">2,000+</div>
              <div className="text-sm text-gray-600">High-Quality Products</div>
            </div>
            {/* Stat 3: Happy Customers */}
            <div className="text-center">
              <div className="font-bold text-xl lg:text-2xl">30,000+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="relative w-full lg:w-[60%] h-[500px] lg:h-screen">
          {/* Hero Image */}
          <Image
            src="/hero1.jpeg" // Image path
            alt="Fashion Models" // Alt text for accessibility
            fill // Makes image responsive to the container
            className="object-cover lg:object-contain lg:object-right-top"
            priority // Gives priority to this image for faster load
          />

          {/* Decorative Star Icons */}
          <div className="absolute top-8 right-8 text-black">
            <StarIcon className="w-10 h-10" /> {/* Star Icon Top Right */}
          </div>
          <div className="absolute bottom-1/3 left-8">
            <StarIcon className="w-8 h-8" /> {/* Star Icon Bottom Left */}
          </div>
        </div>
      </div>
    </section>
  )
}

// Star Icon Component - A reusable SVG star
function StarIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" // Defines the view area of the SVG
      fill="currentColor" // Uses current text color
      className={className} // Dynamically adds class for styling
      aria-hidden="true" // Hides the icon from screen readers
    >
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  )
}
