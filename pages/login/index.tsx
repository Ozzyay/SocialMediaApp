//@ts-nocheck
import type { NextPage } from 'next'
import Header from '../../components/Header';
import {getProviders, signIn} from 'next-auth/react';
import  Grid from '@mui/material/Grid';
import React from 'react';
import { Button, Paper, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import IconButton from '@mui/material/IconButton';
import styles from './index.module.css';
//@ts-ignore
const Login: NextPage = ({ providers }) => {
  const googleSigninHandler = async () => {
    signIn(providers.google.id, {callbackUrl: "/"});
  };
  const githubSigninHandler = () => {

  };
  const paperStyle = {padding: 20, height: '40vh', width: 320, margin:"20px auto", marginTop: '15vh'};
  return <React.Fragment>
    <Header isLoggedIn={false}></Header>
    <Grid> 
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
        <Typography variant="h4" component="h3" mt={4}>Sign-in</Typography>
        <Grid align='center' mt={4} gap={2}>
          <IconButton className={styles.myCustomButton} onClick={googleSigninHandler}><GoogleIcon fontSize='large'></GoogleIcon></IconButton>
        </Grid>
        <Button className={styles.testBtn}variant="outlined">Or sign in as a test user!</Button>
        </Grid>
        </Paper>
        </Grid>
  </React.Fragment>;
};

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
export default Login;

