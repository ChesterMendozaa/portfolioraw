// src/data/portfolioData.ts

export interface Skill {
  name: string
  level: number // 0–100
  category: 'Frontend' | 'Backend' | 'Database' | 'Tools' | 'Other'
}

export interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  github: string
  demo: string
}

export interface Education {
  degree: string
  school: string
  year: string
  description: string
}

export interface Experience {
  position: string
  company: string
  date: string
  description: string
}

export interface Song {
  title: string
  artist: string
  src: string
  cover: string
}

export interface PortfolioData {
  name: string
  role: string
  bio: string
  shortIntro: string
  location: string
  email: string
  profilePhoto: string
  resumeUrl: string
  currentFocus: string
  goals: string
  educationSummary: string

  socialLinks: {
    github: string
    linkedin: string
    facebook: string
  }

  skills: Skill[]
  projects: Project[]
  education: Education[]
  experience: {
    enabled: boolean
    items: Experience[]
  }

  music: {
    enabled: boolean
    playlist: Song[]
  }
}

const portfolioData: PortfolioData = {
  // ===== BASIC INFO =====
  name: '[YOUR NAME]',
  role: '[YOUR ROLE]',
  bio: '[YOUR BIO]',
  shortIntro: '[YOUR SHORT INTRODUCTION]',
  location: '[YOUR LOCATION]',
  email: '[YOUR EMAIL]',
  profilePhoto: '/images/profile.jpg',
  resumeUrl: '[YOUR RESUME]',
  currentFocus: '[YOUR CURRENT FOCUS]',
  goals: '[YOUR GOALS]',
  educationSummary: '[YOUR EDUCATION]',

  // ===== SOCIAL LINKS =====
  socialLinks: {
    github: '[YOUR GITHUB]',
    linkedin: '[YOUR LINKEDIN]',
    facebook: '[YOUR FACEBOOK]',
  },

  // ===== SKILLS =====
  skills: [
    { name: '[SKILL NAME]', level: 80, category: 'Frontend' },
    { name: '[SKILL NAME]', level: 70, category: 'Frontend' },
    { name: '[SKILL NAME]', level: 65, category: 'Backend' },
    { name: '[SKILL NAME]', level: 75, category: 'Database' },
    { name: '[SKILL NAME]', level: 85, category: 'Tools' },
  ],

  // ===== PROJECTS =====
  projects: [
    {
        title: 'My App',
        description: 'A cool app I built',
        image: '/images/my-project.jpg',
        technologies: ['React', 'TypeScript'],
        github: 'https://github.com/ChesterMendozaa/portfolioraw.git',
        demo: 'https://myapp.com',
    },
  ],

  // ===== EDUCATION =====
  education: [
    {
      degree: '[DEGREE]',
      school: '[SCHOOL]',
      year: '[YEAR]',
      description: '[DESCRIPTION]',
    },
  ],

  // ===== EXPERIENCE =====
  // Set enabled: false to hide the entire section
  experience: {
    enabled: true,
    items: [
      {
        position: '[POSITION]',
        company: '[COMPANY]',
        date: '[DATE]',
        description: '[DESCRIPTION]',
      },
    ],
  },

  // ===== MUSIC =====
  // Set enabled: false to hide the entire music section
  music: {
    enabled: true,
    playlist: [
      {
        title: '[SONG TITLE]',
        artist: '[ARTIST NAME]',
        src: '/music/my-song.mp3',
        cover: '/images/album-cover.jpg',
      },
    ],
  },
}

export default portfolioData