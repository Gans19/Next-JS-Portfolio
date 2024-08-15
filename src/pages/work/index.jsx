import Curve from "@/components/Layout/Curve";
import { motion, useTransform, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function Work() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress , "change" , (latest) => {
    console.log(latest)
  });


  // const scale = useTransform(scrollProgress, [0, 1], [0.2, 2]);

  return (
    <>
      <Curve>
        <motion.div style={{
          scaleX: scrollYProgress,x:'-50%',y:'-50%'
        }} className=" h-4 w-screen bg-red">

        </motion.div>
        <div ref={ref} className="w-full fixed top-1/2 left-1/2 h-full flex flex-row">
          {/* Left side content */}
          <div className="w-[50%] h-full overflow-y-scroll">
            <div className="bg-red w-full h-full"></div>
            <div className="bg-yellow w-full h-full"></div>
            <div className="bg-blue w-full h-full"></div>
          </div>

          {/* Right side content (fixed) */}
          <div className="w-[50%] h-full">
            <motion.div
              className="w-full h-full relative bg-gray-400 fixed right-0"
              // style={{ scale }} // Apply the scale transformation
            >
              {/* Right side content goes here */}
            </motion.div>
          </div>
        </div>
      </Curve>
    </>
  );
}
