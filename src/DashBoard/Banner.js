// import React from "react";
// import "./Banner.css";
// const Banner = () => {
//   return (
//     <div className="div450 flex flex-wrap justify-between items-center bg-[#f5f8ff]  w-[87%] p-5 rounded-lg font-sans mx-auto my-5">
//       {/* Left Section */}
//       <div className="max-w-[50%] mb-5">
//         <h1 className="text-6xl font-bold text-[#2b2d42] flex flex-col justify-start text-left ml-[2rem] mb-2">
//             <div className="text-[#6c47ff] text-8xl">450</div>
//             <div>DSA TRACK</div>
//         </h1>

//         <p className="text-lg text-[#555] text-[2rem]">
//           Enhance your data structures and algorithms skills by solving{" "}
//           <span className="text-[#ff4b5c] font-bold">Love Babbar's</span> DSA 450 SDE sheet.
//         </p>
//       </div>

//       {/* Right Section */}
//       <div className="flex flex-col items-center">
//         <div className="flex justify-center items-center w-full">
//           <p className="flex justify-center items-center">
//             <img
//               src="https://450dsa.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fheaderpic.475b7fc5.svg&w=640&q=75"
//               alt="Avatar"
//               className="h-[22rem] w-[22rem] rounded-full object-cover max-w-full h-auto"
//             />
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Banner;


import React from "react";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="div450">
      {/* Left Section */}
      <div className="left-section">
        <h1 className="heading">
          <span className="highlight">450</span>
          DSA TRACK
        </h1>
        <p className="subtext">
          Enhance your data structures and algorithms skills by solving{" "}
          <span className="love-babbar">Love Babbar's</span> DSA 450 SDE sheet.
        </p>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="avatar">
          <img
            src="https://450dsa.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fheaderpic.475b7fc5.svg&w=640&q=75"
            alt="Avatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
