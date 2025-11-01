import mongoose, { Schema, Document } from 'mongoose'

export interface INameCard extends Document {
  walletAddress: string
  name: string
  lastName: string
  meaning: string
  tribe?: string
  gender?: 'male' | 'female'
  ipfsHash: string
  ipfsUrl: string
  explanation?: string
  createdAt: Date
  updatedAt: Date
}

const NameCardSchema: Schema = new Schema(
  {
    walletAddress: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    meaning: {
      type: String,
      required: true,
    },
    tribe: {
      type: String,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    ipfsHash: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    ipfsUrl: {
      type: String,
      required: true,
    },
    explanation: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

// Index for efficient queries
NameCardSchema.index({ walletAddress: 1, createdAt: -1 })

export default mongoose.models.NameCard || mongoose.model<INameCard>('NameCard', NameCardSchema)

