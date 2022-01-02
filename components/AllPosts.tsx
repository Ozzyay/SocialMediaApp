import Post from "./Post";
import React from "react";
import { Grid } from '@mui/material';

const AllPosts = (props: {allPosts: any[]}) => {
  const sortedArray = props.allPosts.sort((a, b) => {
    //@ts-ignore
    return new Date(b.date) - new Date(a.date);
  })
  const finalArray: any[] = sortedArray.slice(0, 11);
  return <React.Fragment>
  {finalArray.map((elem) => {
      const date = new Date(elem.date).toLocaleDateString('EN-US');
      return <Grid item key={elem.date}>
      <Post key={elem.date} img={elem.img} author={elem.author} body={elem.body} date={date}></Post>
      </Grid>
    })}
    </React.Fragment>
};

export default AllPosts;