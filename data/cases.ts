import { Case } from '../types/game';

export const CASES: Case[] = [
  {
    id: 'diamond-heist',
    title: 'The Diamond Heist',
    description: 'A precious diamond has been stolen from the museum. Can you identify the thief?',
    story: 'Last night at the Metropolitan Museum, the famous Blue Star diamond vanished from its display case. Security cameras show three suspects in different rooms around the time of the theft. Each suspect had a different motive and was carrying a specific item. Your job is to determine who stole the diamond, where they were, and what they were carrying.',
    difficulty: 'easy',
    isPremium: false,
    maxHints: 3,
    timeLimit: 15,
    categories: [
      {
        id: 'suspects',
        name: 'Suspects',
        items: ['Alice', 'Bob', 'Charlie']
      },
      {
        id: 'rooms',
        name: 'Rooms',
        items: ['Gallery', 'Storage', 'Office']
      },
      {
        id: 'items',
        name: 'Items',
        items: ['Flashlight', 'Crowbar', 'Keycard']
      }
    ],
    clues: [
      {
        id: 'clue1',
        text: 'The person in the Gallery was not carrying a Crowbar.',
        type: 'negative'
      },
      {
        id: 'clue2',
        text: 'Alice was not in the Storage room.',
        type: 'negative'
      },
      {
        id: 'clue3',
        text: 'The person with the Keycard was in the Office.',
        type: 'positive'
      },
      {
        id: 'clue4',
        text: 'Bob was carrying the Flashlight.',
        type: 'positive'
      },
      {
        id: 'clue5',
        text: 'Charlie was not in the Gallery.',
        type: 'negative'
      }
    ],
    solution: {
      'Alice': { 'Gallery': true, 'Storage': false, 'Office': false, 'Flashlight': false, 'Crowbar': true, 'Keycard': false },
      'Bob': { 'Gallery': false, 'Storage': true, 'Office': false, 'Flashlight': true, 'Crowbar': false, 'Keycard': false },
      'Charlie': { 'Gallery': false, 'Storage': false, 'Office': true, 'Flashlight': false, 'Crowbar': false, 'Keycard': true }
    }
  },
  {
    id: 'mansion-murder',
    title: 'Murder at Blackwood Manor',
    description: 'Lord Blackwood has been found dead. Solve the mystery of who killed him.',
    story: 'Lord Blackwood was found dead in his study this morning. Three guests were staying at the manor last night, each in a different wing of the house. The murder weapon was one of three items found at the scene. Can you determine who committed the crime, where they were staying, and what weapon they used?',
    difficulty: 'medium',
    isPremium: false,
    maxHints: 2,
    timeLimit: 20,
    categories: [
      {
        id: 'suspects',
        name: 'Suspects',
        items: ['Lady Rose', 'Dr. Watson', 'Colonel Grey']
      },
      {
        id: 'wings',
        name: 'Wings',
        items: ['East Wing', 'West Wing', 'North Wing']
      },
      {
        id: 'weapons',
        name: 'Weapons',
        items: ['Candlestick', 'Rope', 'Revolver']
      }
    ],
    clues: [
      {
        id: 'clue1',
        text: 'The person in the East Wing did not use the Rope.',
        type: 'negative'
      },
      {
        id: 'clue2',
        text: 'Lady Rose was not in the North Wing.',
        type: 'negative'
      },
      {
        id: 'clue3',
        text: 'The Revolver was used by someone in the West Wing.',
        type: 'positive'
      },
      {
        id: 'clue4',
        text: 'Dr. Watson did not use the Candlestick.',
        type: 'negative'
      },
      {
        id: 'clue5',
        text: 'Colonel Grey was in the East Wing.',
        type: 'positive'
      },
      {
        id: 'clue6',
        text: 'The person with the Rope was not Lady Rose.',
        type: 'negative'
      }
    ],
    solution: {
      'Lady Rose': { 'East Wing': false, 'West Wing': true, 'North Wing': false, 'Candlestick': false, 'Rope': false, 'Revolver': true },
      'Dr. Watson': { 'East Wing': false, 'West Wing': false, 'North Wing': true, 'Candlestick': false, 'Rope': true, 'Revolver': false },
      'Colonel Grey': { 'East Wing': true, 'West Wing': false, 'North Wing': false, 'Candlestick': true, 'Rope': false, 'Revolver': false }
    }
  },
  {
    id: 'bank-robbery',
    title: 'The Bank Vault Mystery',
    description: 'Someone broke into the bank vault. Find out who, when, and how.',
    story: 'The First National Bank was robbed last night. Three employees had access to the vault, each working different shifts and using different security methods. The robbery happened during one of these shifts. Determine which employee was the inside accomplice, during which shift the crime occurred, and what security method was compromised.',
    difficulty: 'medium',
    isPremium: false,
    maxHints: 2,
    timeLimit: 25,
    categories: [
      {
        id: 'employees',
        name: 'Employees',
        items: ['Sarah', 'Mike', 'Jennifer']
      },
      {
        id: 'shifts',
        name: 'Shifts',
        items: ['Morning', 'Afternoon', 'Night']
      },
      {
        id: 'methods',
        name: 'Security Methods',
        items: ['Keypad', 'Fingerprint', 'Card Reader']
      }
    ],
    clues: [
      {
        id: 'clue1',
        text: 'The Morning shift employee did not use the Fingerprint scanner.',
        type: 'negative'
      },
      {
        id: 'clue2',
        text: 'Sarah worked the Night shift.',
        type: 'positive'
      },
      {
        id: 'clue3',
        text: 'The Card Reader was compromised during the Afternoon shift.',
        type: 'positive'
      },
      {
        id: 'clue4',
        text: 'Mike did not work the Morning shift.',
        type: 'negative'
      },
      {
        id: 'clue5',
        text: 'The Keypad was not used during the Night shift.',
        type: 'negative'
      }
    ],
    solution: {
      'Sarah': { 'Morning': false, 'Afternoon': false, 'Night': true, 'Keypad': false, 'Fingerprint': true, 'Card Reader': false },
      'Mike': { 'Morning': false, 'Afternoon': true, 'Night': false, 'Keypad': false, 'Fingerprint': false, 'Card Reader': true },
      'Jennifer': { 'Morning': true, 'Afternoon': false, 'Night': false, 'Keypad': true, 'Fingerprint': false, 'Card Reader': false }
    }
  },
  {
    id: 'art-forgery',
    title: 'The Art Forgery Scandal',
    description: 'A famous painting has been replaced with a forgery. Uncover the truth.',
    story: 'The renowned "Starry Night" painting at the Riverside Gallery has been discovered to be a forgery. Three art experts examined the painting on different days using different authentication methods. One of them must have been involved in the switch. Determine which expert was the accomplice, on which day the switch occurred, and what method was used to authenticate the fake.',
    difficulty: 'hard',
    isPremium: true,
    maxHints: 1,
    timeLimit: 30,
    categories: [
      {
        id: 'experts',
        name: 'Art Experts',
        items: ['Dr. Martinez', 'Prof. Chen', 'Ms. Thompson']
      },
      {
        id: 'days',
        name: 'Days',
        items: ['Monday', 'Tuesday', 'Wednesday']
      },
      {
        id: 'methods',
        name: 'Authentication Methods',
        items: ['X-Ray', 'Chemical Test', 'UV Light']
      }
    ],
    clues: [
      {
        id: 'clue1',
        text: 'The expert who came on Monday did not use X-Ray analysis.',
        type: 'negative'
      },
      {
        id: 'clue2',
        text: 'Dr. Martinez did not examine the painting on Wednesday.',
        type: 'negative'
      },
      {
        id: 'clue3',
        text: 'The Chemical Test was performed on Tuesday.',
        type: 'positive'
      },
      {
        id: 'clue4',
        text: 'Prof. Chen used the UV Light method.',
        type: 'positive'
      },
      {
        id: 'clue5',
        text: 'Ms. Thompson did not come on Monday.',
        type: 'negative'
      },
      {
        id: 'clue6',
        text: 'The X-Ray analysis was not done on Tuesday.',
        type: 'negative'
      }
    ],
    solution: {
      'Dr. Martinez': { 'Monday': false, 'Tuesday': true, 'Wednesday': false, 'X-Ray': false, 'Chemical Test': true, 'UV Light': false },
      'Prof. Chen': { 'Monday': false, 'Tuesday': false, 'Wednesday': true, 'X-Ray': false, 'Chemical Test': false, 'UV Light': true },
      'Ms. Thompson': { 'Monday': false, 'Tuesday': false, 'Wednesday': false, 'X-Ray': true, 'Chemical Test': false, 'UV Light': false }
    }
  },
  {
    id: 'cyber-heist',
    title: 'The Cyber Security Breach',
    description: 'A major corporation has been hacked. Track down the digital criminal.',
    story: 'TechCorp\'s servers were breached last week, resulting in the theft of sensitive data. Three IT specialists had administrative access during the time of the breach, each using different security protocols and working from different locations. Your task is to identify which specialist was compromised, what protocol was exploited, and from which location the breach originated.',
    difficulty: 'hard',
    isPremium: true,
    maxHints: 1,
    timeLimit: 35,
    categories: [
      {
        id: 'specialists',
        name: 'IT Specialists',
        items: ['Alex Kim', 'Jordan Lee', 'Taylor Swift']
      },
      {
        id: 'protocols',
        name: 'Security Protocols',
        items: ['VPN', 'SSH', 'HTTPS']
      },
      {
        id: 'locations',
        name: 'Locations',
        items: ['Home Office', 'Coffee Shop', 'Co-working Space']
      }
    ],
    clues: [
      {
        id: 'clue1',
        text: 'The person at the Coffee Shop was not using VPN.',
        type: 'negative'
      },
      {
        id: 'clue2',
        text: 'Alex Kim was working from the Co-working Space.',
        type: 'positive'
      },
      {
        id: 'clue3',
        text: 'SSH protocol was used from the Home Office.',
        type: 'positive'
      },
      {
        id: 'clue4',
        text: 'Jordan Lee was not using HTTPS.',
        type: 'negative'
      },
      {
        id: 'clue5',
        text: 'Taylor Swift was not at the Home Office.',
        type: 'negative'
      },
      {
        id: 'clue6',
        text: 'VPN was not used at the Co-working Space.',
        type: 'negative'
      }
    ],
    solution: {
      'Alex Kim': { 'VPN': false, 'SSH': false, 'HTTPS': true, 'Home Office': false, 'Coffee Shop': false, 'Co-working Space': true },
      'Jordan Lee': { 'VPN': false, 'SSH': true, 'HTTPS': false, 'Home Office': true, 'Coffee Shop': false, 'Co-working Space': false },
      'Taylor Swift': { 'VPN': true, 'SSH': false, 'HTTPS': false, 'Home Office': false, 'Coffee Shop': true, 'Co-working Space': false }
    }
  }
];