// import React from "react";
// import { MajorCardProps } from "../../../types/pages/Mbit/MajorEncyclopediaListPage/MajorCard";

// const MajorCard: React.FC<MajorCardProps> = ({ major, onClick }) => {
//   return (
//     <div
//       onClick={() => onClick(major.major_id)}
//       className="overflow-hidden transition-all transform bg-white shadow-md cursor-pointer rounded-xl hover:shadow-lg hover:-translate-y-1"
//     >
//       <div className={`bg-gradient-to-r  p-6`}>
//         <div className="flex items-center gap-4 mb-3">
//           <h3 className="text-2xl font-bold text-black">{major.major_name}</h3>
//         </div>
//         <p className="text-white text-opacity-90">{major.major_description}</p>
//       </div>
//     </div>
//   );
// };

// export default MajorCard;

import React from "react";
import { MajorCardProps } from "../../../types/pages/Mbit/MajorEncyclopediaListPage/MajorCard";

const MajorCard: React.FC<MajorCardProps> = ({ major, onClick }) => {
  return (
    <div
      onClick={() => onClick(major.major_id)}
      className="overflow-hidden transition-all bg-white border border-gray-200 shadow-sm cursor-pointer rounded-xl hover:shadow-md"
    >
      <div className="p-6">
        {/* 전공 이름 */}
        <div className="mb-3">
          <h3 className="mt-1 text-xl font-semibold text-gray-800">
            {major.major_name}
          </h3>
        </div>

        {/* 전공 설명 */}
        <div>
          <p className="mt-1 text-gray-600 line-clamp-3">
            {major.major_description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MajorCard;
