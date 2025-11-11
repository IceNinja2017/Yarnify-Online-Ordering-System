import { url } from "inspector";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String },
        postalCode: { type: String },
        country: { type: String, required: true }
    },
    role: {
        type: String,
        enum: ["admin", "buyer"],
        default: "buyer"
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
        default: null
    },
    verificationTokenExpiresAt: {
        type: Date,
        default: null
    },
    resetPasswordToken: {
        type: String,
        default: null
    },
    resetPasswordExpiresAt: {
        type: Date,
        default: null
    },
    orderHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        }
    ],
    profileImage: {
    url: { 
        type: String, 
        default: 'https://res.cloudinary.com/de3p2nwrz/image/upload/v1762659526/defaultProfile.jpg'
    },
    public_id: { 
        type: String, 
        default: 'defaultProfile' 
    }
}
}, {timestamps: true});
//createdat and updatedat fields are automaticallu added into the document

export const User = mongoose.model('User', userSchema);