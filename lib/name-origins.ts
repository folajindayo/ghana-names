/**
 * Name Origins and Cultural Context
 * Educational content about Ghanaian name meanings and origins
 */

export interface NameOrigin {
  name: string
  origin: string
  culturalSignificance: string
  historicalContext?: string
  relatedNames?: string[]
}

export const nameOrigins: Record<string, NameOrigin> = {
  'Kwame': {
    name: 'Kwame',
    origin: 'Akan',
    culturalSignificance: 'Given to boys born on Saturday. In Akan culture, day names are deeply significant and connect individuals to their day of birth, which is believed to influence their personality and destiny.',
    historicalContext: 'The Akan people of Ghana have a tradition of giving day names based on the day of the week a child is born. This practice has been maintained for centuries.',
    relatedNames: ['Kwesi', 'Kwadwo', 'Kwabena', 'Kwaku', 'Yaw', 'Kofi'],
  },
  'Akosua': {
    name: 'Akosua',
    origin: 'Akan',
    culturalSignificance: 'Given to girls born on Sunday. This name reflects the Akan belief that the day of birth shapes a person\'s character and life path.',
    historicalContext: 'Day names are one of the most important naming traditions in Ghana, particularly among the Akan people.',
    relatedNames: ['Adwoa', 'Abena', 'Akua', 'Yaa', 'Afua', 'Ama'],
  },
  'Kwesi': {
    name: 'Kwesi',
    origin: 'Akan',
    culturalSignificance: 'Given to boys born on Sunday. The name signifies someone who was born on the first day of the week, often associated with leadership qualities.',
  },
  'Adwoa': {
    name: 'Adwoa',
    origin: 'Akan',
    culturalSignificance: 'Given to girls born on Monday. Monday-born children are often believed to be peaceful and calm.',
  },
  'Kwabena': {
    name: 'Kwabena',
    origin: 'Akan',
    culturalSignificance: 'Given to boys born on Tuesday. Associated with warriorship and strength in traditional Akan culture.',
  },
  'Abena': {
    name: 'Abena',
    origin: 'Akan',
    culturalSignificance: 'Given to girls born on Tuesday. Represents strength and resilience.',
  },
  'Kwaku': {
    name: 'Kwaku',
    origin: 'Akan',
    culturalSignificance: 'Given to boys born on Wednesday. Often associated with communication and expressiveness.',
  },
  'Akua': {
    name: 'Akua',
    origin: 'Akan',
    culturalSignificance: 'Given to girls born on Wednesday. Associated with creativity and expression.',
  },
  'Yaw': {
    name: 'Yaw',
    origin: 'Akan',
    culturalSignificance: 'Given to boys born on Thursday. Associated with resilience and perseverance.',
  },
  'Yaa': {
    name: 'Yaa',
    origin: 'Akan',
    culturalSignificance: 'Given to girls born on Thursday. Represents strength of character.',
  },
  'Kofi': {
    name: 'Kofi',
    origin: 'Akan',
    culturalSignificance: 'Given to boys born on Friday. One of the most popular Ghanaian names, made famous by Kofi Annan, former UN Secretary-General.',
    historicalContext: 'Kofi Annan brought international recognition to this traditional Akan name.',
  },
  'Afua': {
    name: 'Afua',
    origin: 'Akan',
    culturalSignificance: 'Given to girls born on Friday. Associated with beauty and grace.',
  },
}

/**
 * Get origin information for a name
 */
export function getNameOrigin(name: string): NameOrigin | null {
  return nameOrigins[name] || null
}

/**
 * Get all origins for names starting with a letter
 */
export function getOriginsByLetter(letter: string): NameOrigin[] {
  return Object.values(nameOrigins).filter(
    (origin) => origin.name.toLowerCase().startsWith(letter.toLowerCase())
  )
}

