import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MessageSquare, Users, Zap, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const routes = [
    { 
      path: '/', 
      name: 'Feed', 
      icon: <MessageSquare className="w-5 h-5 mr-2" /> 
    },
    { 
      path: '/trending', 
      name: 'Trending', 
      icon: <Zap className="w-5 h-5 mr-2" /> 
    },
    { 
      path: '/top-users', 
      name: 'Top Users', 
      icon: <Users className="w-5 h-5 mr-2" /> 
    },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link 
            to="/" 
            className="flex items-center text-xl font-bold text-blue-600 transition-colors hover:text-blue-700"
          >
            <MessageSquare className="w-6 h-6 mr-2" />
            <span>SocialAnalytics</span>
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex items-center text-gray-700 hover:text-blue-600 focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={`px-4 py-2 rounded-md flex items-center text-sm font-medium transition-colors ${
                  location.pathname === route.path
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {route.icon}
                {route.name}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav className="md:hidden bg-white border-t border-gray-200">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={`block px-4 py-3 flex items-center text-sm font-medium transition-colors ${
                  location.pathname === route.path
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {route.icon}
                {route.name}
              </Link>
            ))}
          </nav>
        )}
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} SocialPulse. All rights reserved.</p>
          <p className="mt-1">Data provided by social media platform API.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;