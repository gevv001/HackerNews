import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: String,
    password: { type: String, required: true },
    about: String,
}, { timestamps: true })

export const UserModel = mongoose.model('User', userSchema)

class User {
    static async register(username, password) {
        if (await UserModel.findOne({username})) throw new Error('User exists');

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt)

        const newUser = new UserModel({ username: username, password: hashedPass });

        await newUser.save();

        return newUser;
    }

    static async login(username, password) {
        const user = await UserModel.findOne({username});

        if (!user) throw new Error('User does not exist');

        if (!(await bcrypt.compare(password, user.password))) throw new Error('Wrong password');

        return user;
    }
}

export default User;

