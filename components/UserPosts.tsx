import React from "react";
import { Grid } from "@mui/material";
import Post from "./Post";
import ProfilePost from "./ProfilePost";
import { useSelector } from "react-redux";

const UserPosts = () => {
  const userPosts = useSelector(state => state.user.posts)
return <React.Fragment>
  {userPosts.map((elem) => {
      return <Grid item key={elem.date}>
      <ProfilePost key={elem.date} img={elem.img} author={elem.author} body={elem.body}></ProfilePost>
      </Grid>
    })}
    </React.Fragment>
};

export default UserPosts;
