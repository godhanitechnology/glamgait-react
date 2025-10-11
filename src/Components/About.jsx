import React from "react";
import leftlight from "../assets/leftlight.png";
import rightlight from "../assets/rightlight.png";

const About = () => {
  return (
    <div className="relative bg-[#f3f0ed] h-screen flex justify-center sm:py-16 py-4 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Decorative Images (hidden on mobile) */}
      <img
        src={leftlight}
        alt="decorator"
        className="hidden sm:block absolute top-0 right-24 w-16 md:w-20 opacity-100 pointer-events-none"
      />
      <img
        src={leftlight}
        alt="decorator"
        className="hidden sm:block absolute top-0 right-48 w-16 md:w-16 opacity-100 pointer-events-none"
      />

      {/* <img
        src={rightlight}
        alt="decorator"
        className="hidden sm:block absolute top-0 left-[500px] w-12 md:w-16 opacity-100 pointer-events-none"
      />
      <img
        src={rightlight}
        alt="decorator"
        className="hidden sm:block absolute top-0 right-1/3 w-12 md:w-16 opacity-100 pointer-events-none"
      /> */}

      <img
        src={leftlight}
        alt="decorator"
        className="hidden sm:block absolute top-0 left-24 w-16 md:w-20 opacity-100 pointer-events-none"
      />
      <img
        src={leftlight}
        alt="decorator"
        className="hidden sm:block absolute top-0 left-48 w-16 md:w-16 opacity-100 pointer-events-none"
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl w-full">
        <h1 className="text-2xl md:text-4xl font-bold text-[#00382e] text-center mb-4 sm:mb-8">
          About Our Company
        </h1>

        <p className="text-gray-700 leading-relaxed text-sm md:text-base text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          porttitor erat ac enim viverra, sed pretium neque elementum. Sed at
          turpis nisl. Nullam consequat placerat nulla non egestas. Integer
          efficitur sem quis felis cursus, at pulvinar urna hendrerit. Duis
          commodo nisi quis erat ullamcorper, in varius erat viverra. Quisque
          sagittis lorem in sem convallis, nec condimentum urna accumsan. Morbi
          rhoncus ante nec risus viverra, nec interdum leo blandit. Fusce
          posuere, nisl sed laoreet euismod, massa purus malesuada mi, a
          tincidunt felis nulla in orci. Suspendisse potenti. Mauris dictum
          malesuada tincidunt. Curabitur ac purus non felis fringilla bibendum
          in ut libero. Vivamus in magna vel ligula varius malesuada. Sed
          feugiat massa sed velit volutpat, nec varius orci ullamcorper. In nec
          velit ac ipsum ultrices tincidunt. Suspendisse potenti. Integer
          imperdiet magna at nulla aliquet laoreet.
          <br />
          <br />
          Phasellus eu metus non tortor fermentum ultricies. Maecenas ac
          pulvinar tortor, at sagittis erat. Curabitur venenatis metus id felis
          elementum, non venenatis orci tincidunt. Cras laoreet sem sit amet
          justo congue accumsan. Sed eget nulla et nulla volutpat consequat.
          Integer porttitor velit nec magna eleifend posuere. Praesent ut
          sapien eget est fermentum cursus ut a mauris. In ac ex id magna
          vehicula pretium. Curabitur sagittis, sapien nec maximus feugiat,
          tellus purus convallis nisl, id bibendum turpis mauris sit amet
          justo. Duis gravida nulla sed mauris faucibus, sed interdum lacus
          gravida. Vivamus sed orci nec erat aliquam tincidunt sed a purus.
          Nulla facilisi. Donec venenatis elit at enim tincidunt, nec commodo
          est varius. Vestibulum vel sapien lacinia, dapibus libero at,
          tincidunt nisl.
          <br />
          <br />
          In luctus orci ut sem vestibulum facilisis. Proin tincidunt sed dolor
          sit amet ullamcorper. Nunc aliquet orci vitae justo euismod, vitae
          tincidunt turpis gravida. Suspendisse in cursus arcu. Donec blandit
          nunc non risus efficitur, in sodales arcu tincidunt. Integer ac elit
          at nulla maximus fermentum nec nec magna. Mauris interdum, turpis
          eget vulputate pharetra, augue libero accumsan massa, sed fringilla
          purus eros a purus.
        </p>
      </div>
    </div>
  );
};

export default About;
