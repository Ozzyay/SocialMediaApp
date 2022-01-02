//@ts-nocheck
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import styles from './Header.module.css';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { userActions } from '../store/userSlice';
import { signOut } from 'next-auth/react';

const Header = (props: {isLoggedIn: boolean}) => {
  //@ts-ignore
  const profile = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(userActions.clearData());
    signOut();
  };
  const data = props.isLoggedIn;
  let extra = <React.Fragment>
    <Button href="/" variant="menuButton">Home</Button><Button href="#" onClick={logoutHandler} variant="menuButton">Logout</Button>
    <Link href="/profile"><Avatar alt="Profile" className={styles.avatar} src={profile?.profile?.img}/></Link>
    </React.Fragment>
  if (!data) {
    extra = <Button href="/" variant="menuButton" >Home</Button>
  };
  return (<AppBar>
    <Toolbar>
      <Typography pl={"5vw"} pr={4} variant='h4' component='h2'>OzSocial</Typography>
      {extra}
      </Toolbar>
  </AppBar>
  )
};

export default Header;