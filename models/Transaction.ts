import mongoose, { Schema, Document } from 'mongoose'

export type TransactionType = 'claim' | 'share' | 'gift' | 'like'

export interface ITransaction extends Document {
  type: TransactionType
  fromAddress: string
  toAddress?: string
  nameCardId?: mongoose.Types.ObjectId
  ipfsHash?: string
  metadata?: Record<string, any>
  createdAt: Date
}

const TransactionSchema: Schema = new Schema(
  {
    type: {
      type: String,
      enum: ['claim', 'share', 'gift', 'like'],
      required: true,
      index: true,
    },
    fromAddress: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },
    toAddress: {
      type: String,
      lowercase: true,
      index: true,
    },
    nameCardId: {
      type: Schema.Types.ObjectId,
      ref: 'NameCard',
    },
    ipfsHash: {
      type: String,
      index: true,
    },
    metadata: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
)

// Compound indexes for efficient queries
TransactionSchema.index({ fromAddress: 1, createdAt: -1 })
TransactionSchema.index({ toAddress: 1, createdAt: -1 })
TransactionSchema.index({ type: 1, createdAt: -1 })

export default mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema)

