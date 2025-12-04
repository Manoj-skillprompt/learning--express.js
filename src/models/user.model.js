import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: true,
        index: true,
        trim: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    coverimage: {
        type: String,
    },
    watchHistory: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Video'
    }],
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    refreshToken: {
        type: String
    }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.method.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.method.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        fullname: this.fullname,
        username: this.username
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }

    )
}
userSchema.method.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }

    )
 }
export const User = mongoose.model('User', userSchema)