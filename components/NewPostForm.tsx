//@ts-nocheck
import { Button, CircularProgress, Grid, Paper, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './NewPostForm.module.css'
import axios from "axios";
import { useRouter } from "next/router";
import { userActions } from "../store/userSlice";
const paperStyle = {
  width: "600px",
  height: "170px",
}

const NewPostForm = () => {
  //@ts-ignore
  const [disabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const inputRef = useRef("");
  const dispatch = useDispatch();
  const email = useSelector((state) => state.user.email);
  const profile = useSelector((state) => state.user.profile)
  let button = <Button type="submit" variant="contained" disabled className={styles.btn}>Post</Button>
  const formChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setIsDisabled(false);
    }
  }
  const newPostHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoading(true);
    const input = inputRef.current.value;
    await axios.post('/api/submitpost', {
      body: JSON.stringify({
        email: email,
        post: {author: profile.firstName, img: profile.img, body: input, date: Date.now()},
      }),
    })
    setIsDisabled(true);
    setLoading(false);
    router.reload();
  }
  return (
    
      <Paper elevation={10} style={paperStyle} className={styles.cont}>
        <form onSubmit={newPostHandler}>
        <div className={styles.div} ml={2} pt={2} mr={2}>
        <TextField label="New Post" fullWidth size="small" variant="outlined" multiline rows={3} onChange={formChangeHandler} inputRef={inputRef}></TextField>
        {disabled && button}
        {!disabled && !loading && <Button type="submit" variant="contained" mt={1} className={styles.btn}>Post</Button>}
        {loading && <Button type="submit" variant="contained" mt={1} className={styles.btn} disabled><CircularProgress size={25}/></Button>}
        </div>
        </form>
      </Paper>
  )
};


export default NewPostForm;