// src/components/Layout/Footer.jsx
const Footer = ({ isCollapsed }) => {
  return (
    <footer
      className={`fixed bottom-0 ${isCollapsed ? "left-20" : "left-64"} right-0 h-10 bg-white border-t flex items-center justify-center text-xs text-gray-400 transition-all duration-300`}
    >
      &copy; {new Date().getFullYear()} Your Company Name
    </footer>
  );
};

export default Footer;
