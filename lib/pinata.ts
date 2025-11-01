import pinataSDK from '@pinata/sdk'

const pinata = new pinataSDK({
  pinataApiKey: process.env.PINATA_API_KEY!,
  pinataSecretApiKey: process.env.PINATA_API_SECRET!,
})

export interface NameCardData {
  name: string
  lastName: string
  fullName: string
  meaning: string
  tribe?: string
  gender?: 'male' | 'female'
  explanation?: string
  walletAddress: string
  timestamp: string
  platform: string
}

export async function uploadToPinata(data: NameCardData): Promise<{ ipfsHash: string; ipfsUrl: string }> {
  try {
    // Create the JSON metadata
    const metadata = {
      name: `Ghanaian Name: ${data.fullName}`,
      description: `Authentic Ghanaian name card for ${data.fullName}`,
      attributes: [
        {
          trait_type: 'Name',
          value: data.name,
        },
        {
          trait_type: 'Full Name',
          value: data.fullName,
        },
        {
          trait_type: 'Meaning',
          value: data.meaning,
        },
        ...(data.tribe ? [{ trait_type: 'Tribe', value: data.tribe }] : []),
        ...(data.gender ? [{ trait_type: 'Gender', value: data.gender }] : []),
      ],
      ...data,
    }

    // Pin JSON to IPFS
    const result = await pinata.pinJSONToIPFS(metadata, {
      pinataMetadata: {
        name: `Ghanaian-Name-${data.fullName.replace(/\s+/g, '-')}`,
      },
      pinataOptions: {
        cidVersion: 1,
      },
    })

    const ipfsHash = result.IpfsHash
    const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`

    return { ipfsHash, ipfsUrl }
  } catch (error) {
    console.error('Pinata upload error:', error)
    throw new Error('Failed to upload to Pinata')
  }
}

export async function getFromPinata(ipfsHash: string): Promise<NameCardData | null> {
  try {
    const url = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`
    const response = await fetch(url)
    
    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data as NameCardData
  } catch (error) {
    console.error('Pinata fetch error:', error)
    return null
  }
}

