import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  walletAddress: string
  createdAt: Date
  updatedAt: Date
  preferredGender?: 'male' | 'female' | 'any'
  totalNamesClaimed: number
}

const UserSchema: Schema = new Schema(
  {
    walletAddress: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    preferredGender: {
      type: String,
      enum: ['male', 'female', 'any'],
    },
    totalNamesClaimed: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

