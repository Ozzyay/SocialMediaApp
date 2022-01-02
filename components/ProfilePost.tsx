import { Avatar, Button, Card, CircularProgress, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './ProfilePost.module.css';
import { userActions } from "../store/userSlice";
const ProfilePost = (props: {img: string, body: string, author: string}) => {
  const dispatch = useDispatch();
  const email = useSelector(state => state.user.email)
  const [loading, setLoading] = useState(false);
  const deletePostHandler = async () => {
    setLoading(true);
    await axios.post('/api/deletepost', {
      body: JSON.stringify({
        email: email,
        post: props.body,
      })
    })
    dispatch(userActions.deleteOne(props.body));
    setLoading(false);
  };
return <Paper elevation={10} className={styles.card}>
    <div className={styles.flexContainer}>
    <Avatar alt="post-profile" src={props.img}/>
    <Typography>{props.author} says:</Typography>
    </div>
    <Card className={styles.post} variant="outlined">{props.body}</Card>
    {!loading && <Button className={styles.btn} size="small" color="error" variant="outlined" onClick={deletePostHandler}>Delete Post</Button>}
    {loading && <Button className={styles.btn} size="small" color="error" variant="outlined" disabled><CircularProgress color="error" size={20}/></Button>}
  </Paper>
};

export default ProfilePost;