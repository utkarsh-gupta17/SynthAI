// user model data
import mongoose from 'mongoose';
interface IUser extends Document {
  userId: string;
  numtrials: number;
}
const userSchema = new mongoose.Schema<IUser>({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  numtrials: {
    type: Number,
    default:0
  },
},
  { timestamps: true }
);

// try {
//   export  = mongoose.model()
// } catch (error) {
//   export userLimit: mongoose.Model<IUser> = mongoose.model("userlimits", )
// }
export const userLimit: mongoose.Model<IUser> = mongoose.models["userlimits"]? mongoose.model("userlimits"): mongoose.model("userlimits", userSchema)