import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
    {
        id: Number,
        login: String,
        password: String,
        age: Number,
        isDeleted: Boolean
    },
    { timestamps: true }
);

export default mongoose.model('User', UserSchema);
