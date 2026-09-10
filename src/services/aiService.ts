// src/services/aiService.ts
import portfolioData from '../data/portfolioData'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
}

/**
 * Local fallback response system.
 * Matches simple keywords to portfolio data.
 * This works WITHOUT any AI API key.
 */
function getLocalResponse(input: string): string {
  const q = input.toLowerCase()

  // Greeting
  if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
    return `Hello! I'm a chatbot that knows about ${portfolioData.name}. Ask me about their skills, projects, or how to get in touch.`
  }

  // Name / who are you
  if (q.includes('who are you') || q.includes('your name') || q.includes('about you')) {
    return `${portfolioData.name} is a ${portfolioData.role}. ${portfolioData.bio}`
  }

  // Role
  if (q.includes('role') || q.includes('what do you do') || q.includes('job')) {
    return `${portfolioData.name} works as a ${portfolioData.role}.`
  }

  // Skills
  if (q.includes('skill') || q.includes('technolog') || q.includes('tech stack')) {
    const skills = portfolioData.skills.map((s) => s.name).join(', ')
    return `Skills include: ${skills}`
  }

  // Projects
  if (q.includes('project') || q.includes('portfolio') || q.includes('work')) {
    const projects = portfolioData.projects.map((p) => p.title).join(', ')
    return `Projects include: ${projects}. You can see them in the Projects section.`
  }

  // Education
  if (q.includes('education') || q.includes('study') || q.includes('school') || q.includes('degree')) {
    const edu = portfolioData.education.map((e) => `${e.degree} from ${e.school} (${e.year})`).join('; ')
    return `Education: ${edu}`
  }

  // Experience
  if (q.includes('experience') || q.includes('worked')) {
    if (!portfolioData.experience.enabled) return 'No experience information is available.'
    const exp = portfolioData.experience.items.map((e) => `${e.position} at ${e.company}`).join('; ')
    return `Experience: ${exp}`
  }

  // Contact
  if (q.includes('contact') || q.includes('email') || q.includes('reach')) {
    return `You can contact ${portfolioData.name} at ${portfolioData.email}.`
  }

  // Location
  if (q.includes('location') || q.includes('where')) {
    return `${portfolioData.name} is based in ${portfolioData.location}.`
  }

  // Music
  if (q.includes('music') || q.includes('song')) {
    if (!portfolioData.music.enabled) return 'No music information is available.'
    const songs = portfolioData.music.playlist.map((s) => `${s.title} by ${s.artist}`).join('; ')
    return `Music includes: ${songs}`
  }

  // Fallback
  return "I don't have that information yet. Try asking about skills, projects, education, or contact info."
}

/**
 * Main entry point for chatbot responses.
 *
 * To connect a real AI API later:
 * 1. Set VITE_AI_API_URL in your .env file
 * 2. Create a backend endpoint that calls the AI API
 * 3. Replace the fetch below with your endpoint
 */
export async function getAIResponse(userMessage: string): Promise<string> {
  const apiUrl = import.meta.env.VITE_AI_API_URL

  // If no API configured, use local fallback
  if (!apiUrl) {
    // Simulate a small delay for a natural feel
    await new Promise((resolve) => setTimeout(resolve, 600))
    return getLocalResponse(userMessage)
  }

  // ===== AI API INTEGRATION =====
  // This calls YOUR backend, not the AI API directly.
  // Never put production API keys in frontend code.
  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userMessage,
        context: portfolioData,
      }),
    })

    if (!res.ok) throw new Error('API error')

    const data = await res.json()
    return data.reply || getLocalResponse(userMessage)
  } catch {
    // If API fails, fall back to local
    return getLocalResponse(userMessage)
  }
}