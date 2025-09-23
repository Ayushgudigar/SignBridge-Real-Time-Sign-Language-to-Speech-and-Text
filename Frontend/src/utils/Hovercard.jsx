import { motion } from "framer-motion";

const HoverCard = ({
  children,
  scale = 1.03,          // default scale on hover
  duration = 0.4,        // default animation time
  initialRadius = "8%", // starting border radius
  hoverRadius = "30%",   // hover border radius
  shadow = "0px 10px 20px rgba(0,0,0,0.2)" // default shadow
}) => {
  return (
    <motion.div
      initial={{ scale: 1, borderRadius: initialRadius }}
      whileHover={{
        scale,
        borderRadius: hoverRadius,
        boxShadow: shadow,
        transition: {
          duration:0.5,
          ease: "easeInOut",
        },
      }}
      style={{
        display: "inline-block",
        overflow: "hidden",
      }}
    >
      {children}
    </motion.div>
  );
};

export default HoverCard;
