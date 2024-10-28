import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-cyan-500" />
            <span className="text-xl font-bold text-white">CyberAssess</span>
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
              Home
            </Link>
            <Link to="/assessment" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
              Start Assessment
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;