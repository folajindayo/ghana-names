import mongoose, { Schema, Document } from 'mongoose'

export interface IComment extends Document {
  nameCardId?: mongoose.Types.ObjectId
  name: string
  lastName: string
  walletAddress: string
  comment: string
  parentCommentId?: mongoose.Types.ObjectId
  likes: number
  createdAt: Date
  updatedAt: Date
}

const CommentSchema: Schema = new Schema(
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
    comment: {
      type: String,
      required: true,
      maxlength: 500,
    },
    parentCommentId: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      default: null,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

CommentSchema.index({ nameCardId: 1, createdAt: -1 })
CommentSchema.index({ name: 1, lastName: 1, createdAt: -1 })

export default mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema)

