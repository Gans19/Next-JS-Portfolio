import { motion } from "framer-motion";
import Image from "next/image";
import Logo from "../../assets/logo.png"

const EntranceAnimation = ({ onAnimationComplete }) => {
  return (
    <motion.div
      className="entrance-animation bg-black h-[100vh] justify-center flex items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      onAnimationComplete={onAnimationComplete}
    >
     <Image src={Logo} alt="" className=" w-[150px] h-[150px]" />
    </motion.div>
  );
};

export default EntranceAnimation;
