// app/components/WorkContainer.jsx

'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types'; // Optional, for runtime type checking

const WorkContainer = ({ year, imageSrc, title, description, childVariants, children }) => {
  return (
    <motion.div variants={childVariants} className="mb-24 w-fit mx-auto">
      <div>
        <a href="/work/nordnet-order-flow" className="">
          <motion.div
            className="w-fit mx-auto"
            whileHover={{ y: -4 }}
            transition={{ type: 'easeIn', duration: 0.2 }}
          >
            <Image
              className="w-[960px] mx-auto mb-8 rounded-lg border bg-neutral-50 dark:bg-[#191919] border-[#efefef] dark:border-neutral-800"
              src={imageSrc}
              alt="Work test image"
              width={900}
              height={600}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </motion.div>
        </a>
        <div className="flex sm:flex-row flex-col gap-2 mb-20 max-w-screen-sm mx-auto">
          <motion.p className="text-sm text-neutral-500 dark:text-neutral-400 w-3/12" variants={childVariants}>
            {year}
          </motion.p>
          <motion.div className="flex flex-row gap-2 w-full">
            <motion.div className="flex flex-col gap-2 w-full">
            <a href="/work/nordnet-order-flow" className="no-underline hover:underline">
  <motion.p className="text-sm" variants={childVariants}>
    {title}
  </motion.p>
</a>
              <motion.p className="text-sm text-neutral-500 dark:text-neutral-400" variants={childVariants}>
                {description}
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
        <div className="flex flex-col gap-2">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

// Optional prop types for runtime validation
WorkContainer.propTypes = {
  year: PropTypes.string.isRequired,
  imageSrc: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      src: PropTypes.string,
      height: PropTypes.number,
      width: PropTypes.number,
    })
  ]).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  childVariants: PropTypes.object,
  children: PropTypes.node,
};

export default WorkContainer;
