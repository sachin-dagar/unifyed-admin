import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function LayoutTransition({children}) {

  const animationConfiguration = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence exitBeforeEnter>
    <motion.div
      variants={animationConfiguration}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 2 }}
    >
        {children}
    </motion.div>
    </AnimatePresence>
  );
}

export default LayoutTransition;
