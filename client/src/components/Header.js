import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
  MDBInput,
  MDBBtn,
  MDBInputGroup,
} from 'mdb-react-ui-kit';
import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from '../redux/features/authSlice';
import { searchTours } from '../redux/features/tourSlice';
import { useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';

const Header = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = user?.token;

  if (token) {
    const decodedToken = decode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout());
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(searchTours(search));
      navigate(`/tours/search?searchQuery=${search}`);
      setSearch('');
    } else {
      navigate('/');
    }
  };

  const handleLogout = () => {
    dispatch(setLogout());
  };

  return (
    <MDBNavbar fixed='top' expand='lg' light bgColor='light'>
      <MDBContainer>
        <MDBNavbarBrand
          href='/'
          style={{ color: '#606080', fontWeight: '600', fontSize: '22px' }}
        >
          Tours
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type='button'
          aria-expanded='false'
          aria-label='Toogle navigation'
          onClick={() => setShow(!show)}
          style={{ color: '#606080' }}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBInputGroup>
          <MDBInput label='Search Tours' />
          <MDBBtn
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            rippleColor='dark'
          >
            <MDBIcon icon='search' />
          </MDBBtn>
        </MDBInputGroup>

        <MDBCollapse show={show} navbar>
          <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
            {user?.result?._id && (
              <h5
                style={{
                  margin: '2rem',
                }}
              >
                {user?.result?.name}
              </h5>
            )}
            {user?.result?._id && (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href='/addTour'>
                    <MDBBtn
                      className='header-text'
                      style={{
                        marginTop: '1rem',
                      }}
                    >
                      AddTour
                    </MDBBtn>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href='/dashboard'>
                    <MDBBtn
                      className='header-text'
                      color='info'
                      style={{
                        marginTop: '1rem',
                      }}
                    >
                      Dashboard
                    </MDBBtn>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )}
            {user?.result?._id ? (
              <MDBNavbarItem>
                <MDBNavbarLink href='/login'>
                  <MDBBtn
                    className='header-text'
                    color='danger'
                    style={{
                      marginTop: '1rem',
                    }}
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </MDBBtn>
                </MDBNavbarLink>
              </MDBNavbarItem>
            ) : (
              <MDBNavbarItem>
                <MDBNavbarLink href='/login'>
                  <MDBBtn className='header-text' outline>
                    Login
                  </MDBBtn>
                </MDBNavbarLink>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
