// import React from "react";
// import { Menu, Bell, Search } from "lucide-react";

// interface HeaderProps {
//   onMenuToggle: () => void;
//   currentPage: string;
// }

// const Header: React.FC<HeaderProps> = ({ onMenuToggle, currentPage }) => {
//   return (
//     <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-purple-100">
//       <div className="flex items-center gap-4">
//         <button
//           onClick={onMenuToggle}
//           className="p-2 transition-colors rounded-lg lg:hidden hover:bg-gray-100"
//         >
//           <Menu className="w-5 h-5 text-gray-600" />
//         </button>
//         <div>
//           <h1 className="text-xl font-semibold text-gray-800 capitalize">
//             {currentPage.replace("/", "").replace("-", " ") || "Dashboard"}
//           </h1>
//           <p className="text-sm text-gray-500">
//             Welcome back to your coding journey
//           </p>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
