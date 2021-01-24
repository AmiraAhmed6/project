const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const asyncSign = promisify(jwt.sign);

const User = require('../models/User');

const create = (user) => User.create(user);

const getAll = () => User.find({}).exec();

const getUser =(id) => User.findById(id).exec();

const editUser = (id, body) => User.findByIdAndUpdate(id, body, { new: true }).exec();

const addfollow = (id, trgetid)=> User.update({ "_id": id },{$push: {following: trgetid}});

const removefollow = (id, trgetid)=> User.update({ "_id": id },{$pull: {following: trgetid}});

const login = async ({ username, password }) => {
  const user = await User.findOne({ username }).exec();
  if (!user) {
    throw Error('UN_AUTHENTICATED');
  }
  const isVaildPass = user.validatePassword(password);
  if (!isVaildPass) {
    throw Error('UN_AUTHENTICATED');
  }
  const token = await asyncSign({
    username: user.username,
    id: user.id,
  }, 'SECRET_MUST_BE_COMPLEX', { expiresIn: '1d' });
  return { ...user.toJSON(), token };
};

const getFollowingBlogs = async (id) => {
  const getFollowingArr= await User.findById(id)
  .populate("auther","auther").select ('following').exec();
  var followingBlogs =[]
  for ( let i=0;i<getFollowingArr._doc.following.length; i++) {
    followingBlogs.push(await getAuthor(getFollowingArr._doc.following[i])) ;
  }
return followingBlogs;
};

const deleteone=(id) => User.findOneAndDelete(id).exec();
module.exports = {
  create,
  login,
  getAll,
  getUser,
  editUser,
  deleteone,
  addfollow,
  removefollow,
  getFollowingBlogs
};
