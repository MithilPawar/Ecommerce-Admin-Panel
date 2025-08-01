import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Manage sidebar collapse state

  // Sidebar width values
  const sidebarWidth = isCollapsed ? "w-[80px]" : "w-64";
  const contentMargin = isCollapsed ? "ml-[80px]" : "ml-64";

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <Navbar />

      {/* Sidebar */}
      <div
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] ${sidebarWidth} transition-all duration-300`}
      >
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* Main Content */}
      <main
        className={`p-6 pb-20 transition-all duration-300 ${contentMargin}`}
      >
        {children}
      </main>

      {/* Footer */}
      <div className={`transition-all duration-300 ${contentMargin}`}>
        <Footer isCollapsed={isCollapsed} />
      </div>
    </div>
  );
};

export default Layout;
