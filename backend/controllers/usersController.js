// this file contains functions for User endpoints operations
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import User from '../models/user.js';

// hashes user's password.
function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
}

class UsersController {
  // create new user
  static async createNewUser(request, response) {
    const { password } = request.body;
    const hashedPassword = hashPassword(password);
    const newUser = new User({
      name: request.body.name,
      email: request.body.email,
      hashedPassword,
      phone: request.body.phone,
      isAdmin: request.body.isAdmin,
      street: request.body.street,
      apartment: request.body.apartment,
      zip: request.body.zip,
      city: request.body.city,
      state: request.body.state,
      country: request.body.country,
    });
    try {
      const createdUser = await newUser.save();
      return response.status(201).json(createdUser);
    } catch (error) {
      if (error.code === 11000) {
        // Handle the duplicate key error
        return response.status(500).json({ error: 'Attempting duplicate entry. A user with the email already exists' });
      }
      // Handle other errors
      return response.status(500).json({ error });
    }
  }

  // sends all users in users collection
  static async getAllUsers(request, response) {
    const usersList = await User.find().select('-hashedPassword');
    if (!usersList) {
      return response.status(500).json({ success: false, Details: 'Unable to get all users in the database' });
    }
    return response.status(200).send(usersList);
  }

  // get specific user
  static async getUser(request, response) {
    const {userId} = request.params;
    const user = await User.findById(userId).select('-hashedPassword');
    // .select('-hashedPassword') excludes hashed password from response.
    if (!user) {
      return response.status(404).json({ error: `No user with id ${userId}, found.` });
    }
    return response.status(200).send(user);
  }

  // login endpoint
  static async loginUser(request, response) {
    const { email } = request.body;
    const { password } = request.body;
    try {
      const user = await User.findOne({ email });
      // compare password provided by user with hashed password in the database.
      const validation = compareSync(password, user.hashedPassword);
      console.log(validation)
      if (validation) {
        const secret = process.env.SECRET_KEY;
        const token = jsonwebtoken.sign(
          {
            userId: user._id,
            isAdmin: user.isAdmin,
          },
          secret, // secret key
          {
            expiresIn: '1d', // token expires in 1 day.
          },
        );
        return response.status(200).json(
          {
            status: `User, ${user._id} successfully logged in.`,
            token,
          },
        );
      }
      return response.status(403).json({ error: 'unauthorised access.' });
    } catch (error) {
      return response.status(404).json({ error: `No user with email ${email}, found.` });
    }
  }

  static async countAllUsers(request, response) {
    try {
      const usersCount = await User.countDocuments();
      return response.status(200).json({ 'Number of users in the database': usersCount });
    } catch (error) {
      return response.status(500).send({ error: `Server error, please try again.\n Details: ${error}` });
    }
  }

  // delete a user
  static async deleteUser(request, response) {
    // get id from the parameter in the url.
    const {userId} = request.params;
    try {
      const deletedUser = await User.findByIdAndRemove(userId);
      return response.status(200).json({ status: `User with id: ${deletedUser._id}, was deleted succefully.` });
    } catch (error) {
      return response.status(404).json({ error: `No user with id ${userId}, found.` });
    }
  }
}

export default UsersController;
