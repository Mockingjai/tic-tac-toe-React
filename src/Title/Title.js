import React from 'react';

const styles = {
  display: 'flex',
  justifyContent: 'center',
  color: 'blue',
  textShadow: '2px 2px 2px grey',
};

export const Title = ( props ) => <h3 style={ { ...styles } }>Tic-Tae toe</h3>;