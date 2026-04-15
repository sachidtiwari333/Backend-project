import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.model.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import { ApiResponse } from  '../utils/ApiResponse.js'

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, fullname, password } = req.body
    if(
        [username,email,fullname,password].some((fields)=> fields?.trim() === "")
    )
    {
        throw new ApiError(400," All fields are required !! ")
    }
    const existedUser = await User.findOne({
        $or : [{email}, {username}]
    })
    if(existedUser){
        throw new ApiError(409,"User already Exsits")
    }
    const avatarLocalPath = req.files.avatar[0]?.path
    const coverImageLocalPath = req.files.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar is required")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar is required")
    }
    const user = await User.create({
        username,
        email,
        fullname,
        password,
        avatar ,
        coverImage : coverImage?.url || ""
    })
    const userCreated = User.findById(user._id).select([
        "-password  -refreshToken"
    ])
    if(!userCreated){
        throw new ApiError(400, "Something went wrong")
    }
    return res.status(201).json(
        new ApiResponse(200,userCreated,"User created Sucessfully")
    )
})

export {
    registerUser
}