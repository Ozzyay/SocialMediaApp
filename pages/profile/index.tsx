//@ts-nocheck
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import React, { useEffect } from "react";
import { Grid, Chip, Avatar } from "@mui/material";
import UserPosts from "../../components/UserPosts";
const Profile = () => {
  const userData = useSelector((state) => state.user);
  console.log(userData.posts);
  useEffect(() => {
    if (!userData.profile.img) {
      router.push('/');
    }
  }, [])
  const router = useRouter();
  return <React.Fragment><Header isLoggedIn={true}/>
  <Grid container justifyContent="center" spacing={4} mt={'10vh'}>
  <Chip color="primary" className={styles.chip} avatar={<Avatar src={userData.profile.img}/>} label={`${userData.profile.firstName}\'s Posts`}> </Chip>
  </Grid>
  <Grid container justifyContent="center" spacing={4} mt={'5vh'}>
    <UserPosts/>
  </Grid>
  </React.Fragment>
};


export default Profile;