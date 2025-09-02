export interface GhanaianName {
  name: string
  meaning: string
  tribe: string
  gender: 'male' | 'female'
}

export const ghanaianNames: GhanaianName[] = [
  // Male names
  { name: "Kwame", meaning: "Born on Saturday", tribe: "Akan", gender: "male" },
  { name: "Kwesi", meaning: "Born on Sunday", tribe: "Akan", gender: "male" },
  { name: "Kwadwo", meaning: "Born on Monday", tribe: "Akan", gender: "male" },
  { name: "Kwabena", meaning: "Born on Tuesday", tribe: "Akan", gender: "male" },
  { name: "Kwaku", meaning: "Born on Wednesday", tribe: "Akan", gender: "male" },
  { name: "Yaw", meaning: "Born on Thursday", tribe: "Akan", gender: "male" },
  { name: "Kofi", meaning: "Born on Friday", tribe: "Akan", gender: "male" },
  { name: "Adwoa", meaning: "Born on Monday", tribe: "Akan", gender: "female" },
  { name: "Abena", meaning: "Born on Tuesday", tribe: "Akan", gender: "female" },
  { name: "Akua", meaning: "Born on Wednesday", tribe: "Akan", gender: "female" },
  { name: "Yaa", meaning: "Born on Thursday", tribe: "Akan", gender: "female" },
  { name: "Afua", meaning: "Born on Friday", tribe: "Akan", gender: "female" },
  { name: "Ama", meaning: "Born on Saturday", tribe: "Akan", gender: "female" },
  { name: "Akosua", meaning: "Born on Sunday", tribe: "Akan", gender: "female" },
  
  // Additional male names
  { name: "Nana", meaning: "Chief/King", tribe: "Akan", gender: "male" },
  { name: "Osei", meaning: "Noble", tribe: "Akan", gender: "male" },
  { name: "Boateng", meaning: "Warrior", tribe: "Akan", gender: "male" },
  { name: "Mensah", meaning: "Third child", tribe: "Akan", gender: "male" },
  { name: "Addo", meaning: "King of the road", tribe: "Akan", gender: "male" },
  { name: "Owusu", meaning: "Born on Sunday", tribe: "Akan", gender: "male" },
  { name: "Sarpong", meaning: "Warrior", tribe: "Akan", gender: "male" },
  { name: "Darko", meaning: "Born on Friday", tribe: "Akan", gender: "male" },
  { name: "Asante", meaning: "Warrior", tribe: "Akan", gender: "male" },
  { name: "Opoku", meaning: "Gift from God", tribe: "Akan", gender: "male" },
  { name: "Agyemang", meaning: "Brave warrior", tribe: "Akan", gender: "male" },
  { name: "Kufuor", meaning: "Born on Friday", tribe: "Akan", gender: "male" },
  { name: "Annan", meaning: "Fourth child", tribe: "Akan", gender: "male" },
  { name: "Kufuor", meaning: "Born on Friday", tribe: "Akan", gender: "male" },
  
  // Additional female names
  { name: "Adwoa", meaning: "Born on Monday", tribe: "Akan", gender: "female" },
  { name: "Abena", meaning: "Born on Tuesday", tribe: "Akan", gender: "female" },
  { name: "Akua", meaning: "Born on Wednesday", tribe: "Akan", gender: "female" },
  { name: "Yaa", meaning: "Born on Thursday", tribe: "Akan", gender: "female" },
  { name: "Afua", meaning: "Born on Friday", tribe: "Akan", gender: "female" },
  { name: "Ama", meaning: "Born on Saturday", tribe: "Akan", gender: "female" },
  { name: "Akosua", meaning: "Born on Sunday", tribe: "Akan", gender: "female" },
  { name: "Adwoa", meaning: "Born on Monday", tribe: "Akan", gender: "female" },
  { name: "Abena", meaning: "Born on Tuesday", tribe: "Akan", gender: "female" },
  { name: "Akua", meaning: "Born on Wednesday", tribe: "Akan", gender: "female" },
  { name: "Yaa", meaning: "Born on Thursday", tribe: "Akan", gender: "female" },
  { name: "Afua", meaning: "Born on Friday", tribe: "Akan", gender: "female" },
  { name: "Ama", meaning: "Born on Saturday", tribe: "Akan", gender: "female" },
  { name: "Akosua", meaning: "Born on Sunday", tribe: "Akan", gender: "female" },
  
  // Ewe names
  { name: "Kofi", meaning: "Born on Friday", tribe: "Ewe", gender: "male" },
  { name: "Kodjo", meaning: "Born on Monday", tribe: "Ewe", gender: "male" },
  { name: "Komla", meaning: "Born on Tuesday", tribe: "Ewe", gender: "male" },
  { name: "Koku", meaning: "Born on Wednesday", tribe: "Ewe", gender: "male" },
  { name: "Yawo", meaning: "Born on Thursday", tribe: "Ewe", gender: "male" },
  { name: "Kwami", meaning: "Born on Saturday", tribe: "Ewe", gender: "male" },
  { name: "Kwasi", meaning: "Born on Sunday", tribe: "Ewe", gender: "male" },
  { name: "Adzo", meaning: "Born on Monday", tribe: "Ewe", gender: "female" },
  { name: "Abla", meaning: "Born on Tuesday", tribe: "Ewe", gender: "female" },
  { name: "Aku", meaning: "Born on Wednesday", tribe: "Ewe", gender: "female" },
  { name: "Ya", meaning: "Born on Thursday", tribe: "Ewe", gender: "female" },
  { name: "Afi", meaning: "Born on Friday", tribe: "Ewe", gender: "female" },
  { name: "Ama", meaning: "Born on Saturday", tribe: "Ewe", gender: "female" },
  { name: "Akos", meaning: "Born on Sunday", tribe: "Ewe", gender: "female" },
  
  // Dagomba names
  { name: "Alhassan", meaning: "Lion", tribe: "Dagomba", gender: "male" },
  { name: "Ibrahim", meaning: "Father of many", tribe: "Dagomba", gender: "male" },
  { name: "Musa", meaning: "Drawn from water", tribe: "Dagomba", gender: "male" },
  { name: "Yakubu", meaning: "Supplanter", tribe: "Dagomba", gender: "male" },
  { name: "Abdul", meaning: "Servant of God", tribe: "Dagomba", gender: "male" },
  { name: "Fatima", meaning: "Daughter of the Prophet", tribe: "Dagomba", gender: "female" },
  { name: "Aisha", meaning: "Living", tribe: "Dagomba", gender: "female" },
  { name: "Hajara", meaning: "Forsaken", tribe: "Dagomba", gender: "female" },
  { name: "Zainab", meaning: "Fragrant flower", tribe: "Dagomba", gender: "female" },
  { name: "Rahma", meaning: "Mercy", tribe: "Dagomba", gender: "female" },
  
  // Ga names
  { name: "Nii", meaning: "Chief", tribe: "Ga", gender: "male" },
  { name: "Naa", meaning: "Chief", tribe: "Ga", gender: "female" },
  { name: "Tetteh", meaning: "Third child", tribe: "Ga", gender: "male" },
  { name: "Tettey", meaning: "Third child", tribe: "Ga", gender: "female" },
  { name: "Lartey", meaning: "Fourth child", tribe: "Ga", gender: "male" },
  { name: "Lartei", meaning: "Fourth child", tribe: "Ga", gender: "female" },
  { name: "Bortey", meaning: "Fifth child", tribe: "Ga", gender: "male" },
  { name: "Bortei", meaning: "Fifth child", tribe: "Ga", gender: "female" },
  { name: "Adjetey", meaning: "Sixth child", tribe: "Ga", gender: "male" },
  { name: "Adjei", meaning: "Sixth child", tribe: "Ga", gender: "female" },
  { name: "Adjei", meaning: "Seventh child", tribe: "Ga", gender: "male" },
  { name: "Adjei", meaning: "Seventh child", tribe: "Ga", gender: "female" },
  { name: "Adjei", meaning: "Eighth child", tribe: "Ga", gender: "male" },
  { name: "Adjei", meaning: "Eighth child", tribe: "Ga", gender: "female" },
  { name: "Adjei", meaning: "Ninth child", tribe: "Ga", gender: "male" },
  { name: "Adjei", meaning: "Ninth child", tribe: "Ga", gender: "female" },
  { name: "Adjei", meaning: "Tenth child", tribe: "Ga", gender: "male" },
  { name: "Adjei", meaning: "Tenth child", tribe: "Ga", gender: "female" },
  
  // Fante names
  { name: "Kwame", meaning: "Born on Saturday", tribe: "Fante", gender: "male" },
  { name: "Kwesi", meaning: "Born on Sunday", tribe: "Fante", gender: "male" },
  { name: "Kwadwo", meaning: "Born on Monday", tribe: "Fante", gender: "male" },
  { name: "Kwabena", meaning: "Born on Tuesday", tribe: "Fante", gender: "male" },
  { name: "Kwaku", meaning: "Born on Wednesday", tribe: "Fante", gender: "male" },
  { name: "Yaw", meaning: "Born on Thursday", tribe: "Fante", gender: "male" },
  { name: "Kofi", meaning: "Born on Friday", tribe: "Fante", gender: "male" },
  { name: "Adwoa", meaning: "Born on Monday", tribe: "Fante", gender: "female" },
  { name: "Abena", meaning: "Born on Tuesday", tribe: "Fante", gender: "female" },
  { name: "Akua", meaning: "Born on Wednesday", tribe: "Fante", gender: "female" },
  { name: "Yaa", meaning: "Born on Thursday", tribe: "Fante", gender: "female" },
  { name: "Afua", meaning: "Born on Friday", tribe: "Fante", gender: "female" },
  { name: "Ama", meaning: "Born on Saturday", tribe: "Fante", gender: "female" },
  { name: "Akosua", meaning: "Born on Sunday", tribe: "Fante", gender: "female" },
]

export const getRandomName = (gender: 'any' | 'male' | 'female', lastName: string): GhanaianName => {
  let filteredNames = ghanaianNames
  
  if (gender !== 'any') {
    filteredNames = ghanaianNames.filter(name => name.gender === gender)
  }
  
  const randomIndex = Math.floor(Math.random() * filteredNames.length)
  return filteredNames[randomIndex]
}

export const getNamesByTribe = (tribe: string): GhanaianName[] => {
  return ghanaianNames.filter(name => name.tribe.toLowerCase() === tribe.toLowerCase())
}

export const getNamesByGender = (gender: 'male' | 'female'): GhanaianName[] => {
  return ghanaianNames.filter(name => name.gender === gender)
}
