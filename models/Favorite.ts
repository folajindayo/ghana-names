import mongoose from 'mongoose'

const FavoriteSchema = new mongoose.Schema({
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
  tribe: String,
  gender: {
    type: String,
    enum: ['male', 'female', 'any'],
  },
  explanation: String,
  isAIGenerated: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
})

// Compound index to prevent duplicates
FavoriteSchema.index({ walletAddress: 1, name: 1, lastName: 1 }, { unique: true })

export default mongoose.models.Favorite || mongoose.model('Favorite', FavoriteSchema)

