import mongoose from 'mongoose'

const CollectionSchema = new mongoose.Schema({
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
  description: {
    type: String,
  },
  nameCardIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NameCard',
  }],
  color: {
    type: String,
    default: '#667eea',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
})

// Compound index
CollectionSchema.index({ walletAddress: 1, createdAt: -1 })

export default mongoose.models.Collection || mongoose.model('Collection', CollectionSchema)

