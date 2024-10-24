// import React, { useRef, useEffect, useState } from "react";
// import Image from "next/image";
// import logo_white from "./assets/logo_white.png";
// import shape_white from "./assets/shape_white.png";
// import map from "./assets/map.png";
// import finance from "./assets/finance.png";
// import goal from "./assets/target.png";
// import digital_transformation from "./assets/digital-transformation.png";
// import ESG from "./assets/esg.png";
// import { AiOutlinePlayCircle } from "react-icons/ai";
// import { FaHome } from "react-icons/fa";
// import Link from "next/link";

// export default function Home() {
//   const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
//   const [playingVideo, setPlayingVideo] = useState<string | null>(null); // Track the currently playing video

//   const handleVideoClick = (videoKey: string) => {
//     const videoElement = videoRefs.current[videoKey];

//     if (videoElement) {
//       // Remove the hidden class to make the video visible when clicked
//       videoElement.classList.remove("hidden");
//       setPlayingVideo(videoKey); // Set the currently playing video

//       // Fullscreen logic with browser compatibility
//       if (videoElement.requestFullscreen) {
//         videoElement.requestFullscreen();
//       } else if (videoElement.webkitRequestFullscreen) {
//         videoElement.webkitRequestFullscreen(); // Safari (older versions)
//       } else if (videoElement.msRequestFullscreen) {
//         videoElement.msRequestFullscreen(); // IE11 (very old)
//       }

//       // Play the video once it's in fullscreen
//       videoElement.play();
//     }
//   };

//   const handleFullscreenChange = () => {
//     if (document.fullscreenElement === null) {
//       // If exiting fullscreen, hide the video
//       if (playingVideo) {
//         const videoElement = videoRefs.current[playingVideo];
//         if (videoElement) {
//           videoElement.classList.add("hidden"); // Hide the video
//           setPlayingVideo(null); // Reset the currently playing video
//         }
//       }
//     }
//   };

//   useEffect(() => {
//     // Add fullscreen change listener
//     document.addEventListener("fullscreenchange", handleFullscreenChange);
//     document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
//     document.addEventListener("msfullscreenchange", handleFullscreenChange);

//     // Cleanup function to remove the event listener
//     return () => {
//       document.removeEventListener("fullscreenchange", handleFullscreenChange);
//       document.removeEventListener(
//         "webkitfullscreenchange",
//         handleFullscreenChange
//       );
//       document.removeEventListener(
//         "msfullscreenchange",
//         handleFullscreenChange
//       );
//     };
//   }, [playingVideo]);

//   return (
//     <>
//       <Link
//         href="/"
//         className="space-x-2 flex absolute top-10 left-10 font-bold hover:scale-125"
//       >
//         <FaHome size={20} />
//         <p>Home</p>
//       </Link>
//       <div
//         style={{ gridTemplateColumns: "20% 40% 20%", placeItems: "center" }}
//         className="h-screen grid justify-center items-center responsive-design"
//       >
//         <Image
//           className="absolute top-10 right-10"
//           src={logo_white}
//           width={200}
//           height={200}
//           alt="Logo"
//         />
//         {/* Left Column */}
//         <div className="space-y-3 flex flex-col">
//           <div
//             style={{ width: "15vw", height: "20vh" }}
//             className="bg-slate-200 border-2 border-orange-400 rounded-lg flex flex-col justify-center items-center cursor-pointer"
//             onClick={() => handleVideoClick("local")}
//           >
//             <Image src={map} width={50} alt="Map" />
//             <p className="text-orange-400 text-lg font-bold">Local</p>
//             <div className="rounded-xl bg-blue-700 px-2 h-6 space-x-1 flex justify-center items-center">
//               <AiOutlinePlayCircle size={20} />
//               <p>Play</p>
//             </div>
//             <video
//               ref={(el) => {
//                 videoRefs.current["local"] = el;
//               }}
//               className="hidden" // Hidden initially, full-screen on click
//               poster={map.src}
//             >
//               <source src="your-local-video.mp4" type="video/mp4" />
//             </video>
//           </div>

//           <div
//             style={{ width: "15vw", height: "20vh" }}
//             className="bg-slate-200 border-2 border-orange-400 rounded-lg flex flex-col justify-center items-center cursor-pointer"
//             onClick={() => handleVideoClick("finance")}
//           >
//             <Image src={finance} width={50} alt="Finance" />
//             <p className="text-orange-400 text-lg font-bold">Finance</p>
//             <div className="rounded-xl bg-blue-700 px-2 h-6 space-x-1 flex justify-center items-center">
//               <AiOutlinePlayCircle size={20} />
//               <p>Play</p>
//             </div>
//             <video
//               ref={(el) => {
//                 videoRefs.current["finance"] = el;
//               }}
//               className="hidden" // Hidden initially, but will be shown when clicked
//               poster={finance.src}
//             >
//               <source src="/videos/finance.mp4" type="video/mp4" />
//             </video>
//           </div>
//         </div>
//         {/* Center Column */}
//         <div
//           style={{ width: "40vw", height: "45vh" }}
//           className="bg-slate-200 border-2 border-orange-400 rounded-lg flex flex-col space-y-4 justify-center items-center cursor-pointer"
//           onClick={() => handleVideoClick("strategy")}
//         >
//           <Image src={goal} width={100} alt="Strategy" />
//           <p className="text-orange-400 text-2xl font-bold">Strategy</p>
//           <div className="rounded-2xl bg-blue-700 px-4 py-1 space-x-1 flex justify-center items-center">
//             <AiOutlinePlayCircle size={30} />
//             <p>Play</p>
//           </div>
//           <video
//             ref={(el) => {
//               videoRefs.current["strategy"] = el;
//             }}
//             className="hidden" // Hidden initially, full-screen on click
//             poster={goal.src}
//           >
//             <source src="your-strategy-video.mp4" type="video/mp4" />
//           </video>
//         </div>
//         {/* Right Column */}
//         <div className="space-y-3">
//           <div
//             style={{ width: "15vw", height: "20vh" }}
//             className="bg-slate-200 border-2 border-orange-400 rounded-lg flex flex-col justify-center items-center cursor-pointer"
//             onClick={() => handleVideoClick("digitalTransformation")}
//           >
//             <Image
//               src={digital_transformation}
//               width={50}
//               alt="Digital Transformation"
//             />
//             <p className="text-orange-400 text-center text-lg font-bold">
//               Digital Transformation
//             </p>
//             <div className="rounded-xl bg-blue-700 px-2 h-6 space-x-1 flex justify-center items-center">
//               <AiOutlinePlayCircle size={20} />
//               <p>Play</p>
//             </div>
//             <video
//               ref={(el) => {
//                 videoRefs.current["digitalTransformation"] = el;
//               }}
//               className="hidden" // Hidden initially, full-screen on click
//               poster={digital_transformation.src}
//             >
//               <source
//                 src="your-digital-transformation-video.mp4"
//                 type="video/mp4"
//               />
//             </video>
//           </div>

//           <div
//             style={{ width: "15vw", height: "20vh" }}
//             className="bg-slate-200 border-2 border-orange-400 rounded-lg flex flex-col justify-center items-center cursor-pointer"
//             onClick={() => handleVideoClick("esg")}
//           >
//             <Image src={ESG} width={50} alt="ESG" />
//             <p className="text-orange-400 text-lg font-bold">ESG</p>
//             <div className="rounded-xl bg-blue-700 px-2 h-6 space-x-1 flex justify-center items-center">
//               <AiOutlinePlayCircle size={20} />
//               <p>Play</p>
//             </div>
//             <video
//               ref={(el) => {
//                 videoRefs.current["esg"] = el;
//               }}
//               className="hidden" // Hidden initially, full-screen on click
//               poster={ESG.src}
//             >
//               <source src="your-esg-video.mp4" type="video/mp4" />
//             </video>
//           </div>
//         </div>
//         <Image
//           style={{ width: "50vh", height: "50vh" }}
//           className="absolute bottom-0 left-0"
//           src={shape_white}
//           alt="Logo"
//         />
//       </div>
//     </>
//   );
// }
