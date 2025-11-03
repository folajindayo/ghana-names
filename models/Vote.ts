import mongoose, { Schema, Document } from 'mongoose'

export interface IVote extends Document {
  nameCardId?: mongoose.Types.ObjectId
  name: string
  lastName: string
  walletAddress: string
  voteType: 'upvote' | 'downvote'
  createdAt: Date
}

const VoteSchema: Schema = new Schema(
  {
    nameCardId: {
      type: Schema.Types.ObjectId,
      ref: 'NameCard',
      index: true,
    },
    name: {
      type: String,
      required: true,
      index: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    walletAddress: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },
    voteType: {
      type: String,
      enum: ['upvote', 'downvote'],
      required: true,
    },
  },
  { timestamps: true }
)

// Compound index to prevent duplicate votes
VoteSchema.index({ nameCardId: 1, walletAddress: 1 }, { unique: true })
VoteSchema.index({ name: 1, lastName: 1, walletAddress: 1 }, { unique: true })

export default mongoose.models.Vote || mongoose.model<IVote>('Vote', VoteSchema)

