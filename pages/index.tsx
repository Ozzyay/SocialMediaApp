import type { NextPage } from 'next';
import { getSession, signIn, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import Header from '../components/Header';
import dbConnect from '../lib/dbConnect';
import loadModel from '../models/user';
import { useDispatch } from 'react-redux';
import { userActions } from '../store/userSlice';
import NewPostForm from '../components/NewPostForm';
import { Grid } from '@mui/material';
import AllPosts from '../components/AllPosts';
//@ts-ignore
const Home: NextPage = ({userData}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.setData(userData));
  }, [userData, dispatch])
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });
  return (
    <React.Fragment>
      <Header isLoggedIn={true}></Header>
      <Grid container spacing={4} mt={'10vh'} justifyContent="center"
>
        <Grid item>
      <NewPostForm></NewPostForm>
      </Grid>
        <AllPosts allPosts={userData.allPosts}/>
      </Grid>
    </React.Fragment>
    
  )
}
//@ts-ignore
export async function getServerSideProps({req}) {
  const session = await getSession({req})
  if (session) {
    await dbConnect();
    const email = session?.user?.email;
    //@ts-ignore
    const Model = loadModel();
    const data = await Model.find({});
    let allPostsArray: any[] = [];
    data.map((elem) => {
      elem.posts.map((post: any) => {
        const push = {body: post.body, date: post.date, author: post.author, img: post.img}
        allPostsArray.push(push)
      })
    });
    let user = data.find(elem => elem.email == email);
    if (!user) {
      const newUser = new Model({
        email: email,
        profile: {firstName: session.user.name, lastName: null, img: session.user.image},
        posts: []
      })
      newUser.save();
      return {props: {userData: {email: email, profile: {firstName: session.user.name, lastName: null, img: session.user.image}}}}
    }
    const allPosts = JSON.parse(JSON.stringify(allPostsArray));
    const userPosts = JSON.parse(JSON.stringify(user.posts));
    return {props: {userData: {email: user.email, profile: {...user.profile}, posts: [...userPosts], allPosts: [...allPosts]}}};
  }
  return {redirect: {
  destination: '/login',
  statusCode: 307
}}
}
export default Home;
