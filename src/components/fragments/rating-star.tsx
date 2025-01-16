import { Star, StarHalf } from "lucide-react";
import React, { Fragment } from "react";

const RatingStar = ({ averageRating }: { averageRating: number }) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, index) => {
        const currentStar = index + 1;

        const isFullStar = currentStar <= Math.floor(averageRating);
        const isHalfStar = !isFullStar && currentStar - 0.5 <= averageRating;

        return (
          <Fragment key={index}>
            {isFullStar && (
              <Star size={12} className="text-yellow-300 fill-yellow-300" />
            )}
            {isHalfStar && (
              <div className="relative">
                <Star size={12} className="text-yellow-300 " />
                <StarHalf
                  size={12}
                  className="absolute inset-0 text-yellow-300 fill-yellow-300"
                />
              </div>
            )}
            {!isFullStar && !isHalfStar && (
              <Star size={12} className="text-gray-300" />
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default RatingStar;
