import { Avatar, Card, Paper, Typography } from "@mui/material";
import styles from './Post.module.css';

const Post = (props: {img: string, author: string, body: string, date: string}) => {
  return <Paper elevation={10} className={styles.card}>
    <div className={styles.flexContainer}>
    <Avatar alt="post-profile" src={props.img}/>
    <Typography>{props.author} says:</Typography>
    </div>
    <Card className={styles.post} variant="outlined">{props.body}</Card>
    <div className={styles.date}>
    <Typography className={styles.dateText}>Posted on {props.date}</Typography>
    </div>
  </Paper>
};

export default Post;