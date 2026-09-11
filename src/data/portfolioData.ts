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
  name: 'Chester Mendoza',
  role: 'Web Developer',
  bio: 'SHORT THINGS ABOUT ME',
  shortIntro: 'intro',
  location: 'Bay, Laguna',
  email: 'Chesterm560@gmail.com',
  profilePhoto: '/images/profile.jpg',
  resumeUrl: 'no resume',
  currentFocus: 'Focus ako sa goal ko',
  goals: 'my goal is to drink a different types of alchohol',
  educationSummary: 'Currently pursuing a degree in Information Technology at LSPU-LB',

  // ===== SOCIAL LINKS =====
  socialLinks: {
    github: 'https://github.com/ChesterMendozaa',
    linkedin: '#',
    facebook: 'https://www.facebook.com/chesterrrzzz',
  },

  // ===== SKILLS =====
  skills: [
    { name: 'JavaScript', level: 80, category: 'Frontend' },
    { name: 'TypeScript', level: 70, category: 'Frontend' },
    { name: 'Node.js', level: 65, category: 'Backend' },
    { name: 'SQL', level: 75, category: 'Database' },
    { name: 'MongoDB', level: 40, category: 'Database' },
    { name: 'Git', level: 85, category: 'Tools' },
    { name: 'Figma', level: 85, category: 'Tools' },
  ],

  // ===== PROJECTS =====
  projects: [
    {
        title: 'Portfolio Website',
        description: 'This is design to showcase my skills and projects as a web developer.',
        image: '/images/my-project.jpg',
        technologies: ['React', 'TypeScript'],
        github: 'https://github.com/ChesterMendozaa/portfolioraw.git',
        demo: 'http://localhost:5173/',
    },
  ],

  // ===== EDUCATION =====
  education: [
    {
      degree: 'Bachelor of Science in Information Technology',
      school: 'Laguna State Polytechnic University - Los Baños',
      year: '2023 - 2027',
      description: 'Pursuing a degree in Information Technology with a focus on web development.',
    },
    {
      degree: 'Senior High School',
      school: 'Colegio De Los Banos',
      year: '2021 - 2023',
      description: 'Completed senior high school with a focus on GAS.',
    },
    {
      degree: 'Junior High School',
      school: 'Los Banos National High School',
      year: '2017 - 2021',
      description: 'Completed junior high school',
    }
  ],

  // ===== EXPERIENCE =====
  // Set enabled: false to hide the entire section
  experience: {
    enabled: true,
    items: [
      {
        position: 'None',
        company: 'None',
        date: 'None',
        description: 'No experience yet, but eager to learn and grow in the field of web development.',
      },
    ],
  },

  // ===== MUSIC =====
  // Set enabled: false to hide the entire music section
  music: {
    enabled: true,
    playlist: [
      {
        title: 'On Bended Knee',
        artist: 'Boyz II Men',
        src: '/music/my-song.mp3',
        cover: '/images/album-cover.jpg',
      },
    ],
  },
}

export default portfolioData