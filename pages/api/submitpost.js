import dbConnect from '../../lib/dbConnect';
import loadModel, { UserModel } from '../../models/user'
import mongoose from 'mongoose';

export default async function handler(req, res) {
  const data = JSON.parse(req.body.body)
  const email = data.email;
  const postData = data.post;
  await dbConnect();
  try {
    const Model = loadModel();
    await Model.updateOne({email: email}, { $push:  {posts:postData}}, { 'upsert': true });
    res.status(200).json({'success': 'true'});
  } catch (err) {
    console.error(err)
    return res.status(502).json({error: err})
  };

};