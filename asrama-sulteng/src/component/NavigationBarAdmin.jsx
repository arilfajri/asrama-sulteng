import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";
import React, { useState } from "react";

const NavigationBarAdmin = () => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div>
      <div
        className="bg-abuAbu shadow flex justify-end"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="cursor-pointer hover:text-blue-800 gap-1 py-5 px-12 flex items-center">
          <UserCircleIcon className="h-6 w-6" />
          <Typography>Aril Fajri Tolani</Typography>
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3.5 w-3.5 transition-transform transform ${
              isHover ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default NavigationBarAdmin;
