import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiHeart, FiSearch, FiUser } from 'react-icons/fi';
import './index.less';

interface BottomNavigationProps {
  currentPath: string;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentPath }) => {
  const isActive = (path: string): string => {
    return currentPath === path ? 'active' : '';
  };

  return (
    <nav className="bottom-navigation">
      <Link to="/" className={`nav-item ${isActive('/')}`}>
        <FiHome size={24} />
        <span>推荐</span>
      </Link>
      <Link to="/follow" className={`nav-item ${isActive('/follow')}`}>
        <FiHeart size={24} />
        <span>关注</span>
      </Link>
      <Link to="/search" className={`nav-item ${isActive('/search')}`}>
        <FiSearch size={24} />
        <span>搜索</span>
      </Link>
      <Link to="/profile" className={`nav-item ${isActive('/profile')}`}>
        <FiUser size={24} />
        <span>我的</span>
      </Link>
    </nav>
  );
};

export default BottomNavigation;
