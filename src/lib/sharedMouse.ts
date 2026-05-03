// Single shared mouse state — one listener for the entire app
// Both HeroCanvas and GuideCharacter import from here

export const sharedMouse = { x: 0, y: 0 }

if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e: MouseEvent) => {
    sharedMouse.x = (e.clientX / window.innerWidth)  *  2 - 1
    sharedMouse.y = (e.clientY / window.innerHeight) * -2 + 1
  }, { passive: true })
}
