// Dark Bird Films - Video Data
// Extracted from darkbirdfilms.com/copy-of-showreel-1

export interface VideoItem {
  id: string
  youtubeId?: string
  localVideoSrc?: string  // For local video files
  title: string
  category: 'feature-film' | 'music-video' | 'commercial' | 'documentary' | 'showreel'
  client?: string
  views?: string
  year?: string
  thumbnail?: string
  services?: string[]
}

// Helper function to get YouTube thumbnail
export function getYouTubeThumbnail(videoId: string, quality: 'default' | 'hq' | 'mq' | 'sd' | 'maxres' = 'hq'): string {
  const qualityMap = {
    default: 'default',
    hq: 'hqdefault',
    mq: 'mqdefault',
    sd: 'sddefault',
    maxres: 'maxresdefault',
  }
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`
}

// Helper function to get YouTube embed URL
export function getYouTubeEmbedUrl(videoId: string, autoplay = false): string {
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    ...(autoplay && { autoplay: '1', mute: '1' }),
  })
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`
}

// Helper function to get YouTube watch URL
export function getYouTubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`
}
