/**
 * MongoDB Connection Test Script
 * Run with: node scripts/test-mongodb.js
 */

require('dotenv').config({ path: '.env.local' })

const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI not found in .env.local')
  process.exit(1)
}

// Mask password in URI for display
const maskedUri = MONGODB_URI.replace(/:([^:@]+)@/, ':****@')

console.log('🔍 Testing MongoDB Connection...')
console.log('📍 URI:', maskedUri)
console.log('')

// Check if URI contains railway.internal (not accessible locally)
if (MONGODB_URI.includes('railway.internal')) {
  console.warn('⚠️  Warning: URI contains "railway.internal"')
  console.warn('   Railway internal hostnames only work within Railway\'s network.')
  console.warn('   For local development, you need a public MongoDB Atlas connection string.')
  console.warn('   Get one at: https://www.mongodb.com/cloud/atlas')
  console.log('')
}

const connectionOptions = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 5000,
  connectTimeoutMS: 5000,
}

mongoose
  .connect(MONGODB_URI, connectionOptions)
  .then(async () => {
    console.log('✅ MongoDB connection successful!')
    console.log('')
    
    // Test database operations
    try {
      const db = mongoose.connection.db
      const collections = await db.listCollections().toArray()
      
      console.log('📊 Database Info:')
      console.log('   Database name:', db.databaseName)
      console.log('   Collections:', collections.length)
      
      if (collections.length > 0) {
        console.log('   Collection names:', collections.map(c => c.name).join(', '))
      }
      
      // Test collections from our app
      const collectionsToCheck = ['namecards', 'users', 'favorites', 'transactions']
      for (const collName of collectionsToCheck) {
        try {
          const count = await db.collection(collName).countDocuments()
          if (count > 0) {
            console.log(`   ✅ ${collName}: ${count} documents`)
          }
        } catch (err) {
          // Collection might not exist yet, that's okay
        }
      }
    } catch (err) {
      console.warn('   Could not fetch database info:', err.message)
    }
    
    console.log('')
    console.log('✅ All tests passed! MongoDB is ready to use.')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ MongoDB connection failed!')
    console.error('')
    console.error('Error details:')
    console.error('   Message:', error.message)
    console.error('   Code:', error.code || 'N/A')
    console.error('')
    
    if (error.message.includes('ENOTFOUND')) {
      console.error('💡 Troubleshooting:')
      console.error('   • The hostname could not be resolved')
      console.error('   • Check if the MongoDB server is accessible')
      console.error('   • For Railway: Use a public MongoDB Atlas connection string for local dev')
    } else if (error.message.includes('authentication failed')) {
      console.error('💡 Troubleshooting:')
      console.error('   • Check your username and password')
      console.error('   • Verify MongoDB user credentials')
    } else if (error.message.includes('timeout')) {
      console.error('💡 Troubleshooting:')
      console.error('   • The server might be unreachable')
      console.error('   • Check your network connection')
      console.error('   • Verify firewall settings')
    }
    
    console.error('')
    console.error('📖 For local development, get a MongoDB Atlas connection string at:')
    console.error('   https://www.mongodb.com/cloud/atlas')
    process.exit(1)
  })

