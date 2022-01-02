import loadModel from '../models/user';
import mongoose from 'mongoose';
const addPost =  async (email, post) => {
  try {
  const user = await Model.find({email: email})
  console.log(user);
  user.posts = [...user.posts, {body: post, date: Date.now()}];
  await user.save();
  return true
  } catch (err) {
    return err
  };

};

export default addPost;