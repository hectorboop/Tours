import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter
      className='text-center text-white fixed-bottom'
      style={{ backgroundColor: '#f1f1f1' }}
    >
      <div
        className='text-center text-dark p-3'
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      >
        © {new Date().getFullYear()} <span />
        <a className='text-dark' href='https://hectorboop.github.io/'>
          Rushane Wilson
        </a>
      </div>
    </MDBFooter>
  );
}
