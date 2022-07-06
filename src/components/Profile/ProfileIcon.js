import React, { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

const ProfileIcon = ({ onRouteChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='pa4 tc'>
      <Dropdown isOpen={isDropdownOpen} toggle={toggleDropdown}>
        <DropdownToggle
          caret
          tag='span'
          data-toggle='dropdown'
          aria-expanded={isDropdownOpen}
        >
          <img
            src='http://tachyons.io/img/logo.jpg'
            className='br-100 ba h3 w3 dib'
            alt='avatar'
          />
        </DropdownToggle>
        <DropdownMenu
          right
          className='b--transparent shadow-5'
          style={{
            marginTop: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          <DropdownItem onClick={() => onRouteChange('profile')}>
            View Profile
          </DropdownItem>
          <DropdownItem onClick={() => onRouteChange('signin')}>
            Signout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default ProfileIcon;
