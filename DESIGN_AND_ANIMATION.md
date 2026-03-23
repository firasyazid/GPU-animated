# Design & Animation Techniques

This document breaks down the specific design methodologies, UI patterns, and animation techniques used to build the Silicon Architecture GPU Teardown experience.

## 1. Declarative Scroll-Linked Animations (Framer Motion)
Instead of relying on time-based keys (like `duration: 0.5s`), almost every animation is mathematically bound to the user's scroll position. 
- **Technique:** We use Framer Motion's `useScroll` paired with `useTransform`. 
- **Execution:** We map the scroll offset fraction (`0.0` to `1.0`) directly to CSS values (`opacity: [0, 1]`, `y: [50, 0]`). This creates a "scrubbable" timeline that plays exactly at the speed the user scrolls, perfectly reversing if they scroll up.

## 2. "Sticky Stacking" Staged Viewports
The site appears to be a single, non-scrolling stage that changes scenes, but it is actually a standard vertically scrolling webpage.
- **Technique:** `position: sticky` combined with `height: 100vh`.
- **Execution:** Each section (like the GPU Die) is extremely tall (e.g., `min-h-[150vh]`), but its inner content wrapper is `sticky top-0 h-screen`. This locks the content seamlessly into the viewport while the user scrolls through the remaining invisible height, acting as the "runway" for the scroll-linked animations to play out before the section actually leaves the screen.

## 3. Cinematic Crossfades & Parallax
We avoided hard scroll cuts between sections to maintain the illusion of a continuous camera flythrough.
- **Technique:** The custom `<SectionTransition>` wrapper.
- **Execution:** As the user reaches the final 12% of a section's scroll height, the wrapper begins scaling the entire section container down to `0.97` and fading it to `0`. Simultaneously, the next section begins fading in from `0` to `1` while translating upwards. This overlaps the two sections, creating a cinematic dissolve edit.

## 4. Glowing Ambient Auras & Glassmorphism
The design relies on "dark mode" aesthetics mixed with vibrant, bleeding light to emphasize high-tech hardware.
- **Technique:** Radial CSS gradients, heavy CSS Blur filters, and translucent borders.
- **Execution:** Behind every floating hardware image, we render a slow-breathing `<div>` with `background: radial-gradient(...)` and a massive `blur-[60px]` filter. E.g., Cyan for the Heatsink, Pink for the VRAM. This mimics ambient LED light bleeding onto a dark table. 
- **UI Elements:** The Navbar and Scroll indicators use `bg-white/5` with `backdrop-blur-3xl` to create frosted glass panes that let the bright core colors smear through softly.
## 4.1 Interactive 3D Mouse Parallax
To make the 2D hardware images feel like physical objects suspended inside the monitor, we added a custom `<InteractiveTilt>` wrapper.
- **Technique:** Framer Motion `useSpring` and `useMotionValue` mapping cursor coordinates to CSS 3D transforms.
- **Execution:** We track the user's cursor normalized position (-0.5 to 0.5) over the bounding box of the image container. We pass these raw coordinates into a heavy physics spring (`stiffness: 100, damping: 30`) to give the object "weight". We then map this spring algebraically to `rotateX` and `rotateY` (-20deg to 20deg), and apply `transformStyle: "preserve-3d"` to the wrapper, creating a flawless magnetic tilt effect that follows the user's mouse in real-time.

## 5. Infinite "Breathing" Micro-Animations
While the main reveals are mapped strictly to the scroll, elements on the screen shouldn't feel completely dead if the user stops scrubbing.
- **Technique:** Framer Motion infinite keyframes.
- **Execution:** The hardware images (like the PCB and VRM) have a continuous gentle vertical float applied (`animate={{ y: [0, -12, 0] }}`) operating independently of the scroll. The ambient light blooms also scale and shift opacity infinitely, giving the page a "living" hardware feel.

## 6. Scroll-Driven Image Sequence (Apple-style Canvas Scroll)
The massive Hero introduction relies on a 50-frame image sequence rendering over a 1000vh scroll distance. This technique is widely known as **Canvas Scroll Scrubbing** or an **"Apple-style" product scroll**.
- **Technique:** HTML5 `<canvas>` rendering tied mathematically to the scroll wheel.
- **Execution:** Rather than playing a heavy MP4 video file (which stutters when scrubbing backward) or using an `<img src>` sequence (which causes severe browser repaints), we load the 50 frames into memory. We then map the `scrollYProgress` fraction natively to the frame array index. When the user scrolls down, it fires frames 1, 2, 3 forward. When they scroll up, it fires 3, 2, 1 perfectly in reverse with zero lag. We draw these raw images directly onto a scaled `<canvas>` context (scaled by `window.devicePixelRatio`) ensuring they stay flawlessly sharp on Retina displays.
