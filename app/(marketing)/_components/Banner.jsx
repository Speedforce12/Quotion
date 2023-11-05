import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className='flex flex-col max-w-5xl items-center justify-center relative'>
      <div className='sm:w-[350px] sm:h-[350px] w-[300px] h-[300px] md:w-[350px] md:h-[350px]'>
        <Image
          alt='being creative'
          src='/being-creative-light.png'
          fill
          className='object-contain dark:block hidden'
        />

        <Image
          alt='being creative'
          src='/being-creative.png'
          fill
          className='object-contain dark:hidden'
        />
      </div>
    </div>
  );
};

export default Banner;
