import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
interface IdbUser extends mongoose.Document{
    email: String,
    password: String,
    role: String,
    contentIDs:[{
        contentId: String}
    ]
} 
interface IdbUserModel extends mongoose.Model<IdbUser>{
    findByCredentials(email:String,password:String):Promise<IdbUser|null>;
    generateAuthToken():Promise<String | null>;
}
const dbUserSchema = new mongoose.Schema<IdbUser,IdbUserModel>({
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,required:true},
    contentIDs: [{
        contentId: {
            type: String,
            required: true,
        }
    }]
})
/*dbUserSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})*/

dbUserSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id,role: user.role}, "my_secret_key")
    return token
}
dbUserSchema.statics.findByCredentials = async function (email:String,password:String) {
    const user = await dbUser.findOne({email});
    if (!user){
        throw new Error('No user found')
    }
    //const isPasswordMatch = await bcrypt.compare(password,user.password);
    if (password !== user.password) {
        throw new Error("Wrong password") // Throw an error if password is invalid
      }
    return user;
}

const dbUser = mongoose.model<IdbUser, IdbUserModel>('User', dbUserSchema);

export default dbUser;