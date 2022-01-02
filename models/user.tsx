import mongoose from 'mongoose';
import dbConnect from '../lib/dbConnect';

export const UserModel = new mongoose.Schema({
  email: {type: String, unique: true, required: true},
  profile: {firstName: String, lastName: String, img: String},
  posts: [{body: String, date: Date, author: String, img: String}],
  lastLoggedIn: Date
})
//@ts-ignore
function loadModel() {
  return mongoose.models['users'] 
  ? mongoose.model('users')
  : mongoose.model('users', UserModel)
}

export default loadModel;