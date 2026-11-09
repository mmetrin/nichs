const SHOW_DISTANCE = 32
const HIDE_DISTANCE = 48

// Track a sustained change of direction, rather than reacting to trackpad jitter.
export function createHeaderScrollState(initialY) {
  let previousY = initialY
  let directionStart = initialY
  let direction = 0
  let hidden = true

  return (y, { topBoundary, keepVisible = false }) => {
    const nextDirection = Math.sign(y - previousY)
    if (nextDirection && nextDirection !== direction) {
      directionStart = previousY
      direction = nextDirection
    }
    previousY = y

    if (y <= topBoundary || (!hidden && keepVisible)) {
      hidden = y <= topBoundary
      directionStart = y
      direction = 0
      return hidden
    }

    // Separate the static/floating handoff thresholds to avoid flicker near the top.
    if (hidden && y <= topBoundary + SHOW_DISTANCE) return hidden
    const distance = Math.abs(y - directionStart)
    if (direction < 0 && distance >= SHOW_DISTANCE) hidden = false
    if (direction > 0 && distance >= HIDE_DISTANCE) hidden = true
    return hidden
  }
}
