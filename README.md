# Silicon Architecture | GPU Teardown 🎥

An interactive, cinematic teardown of modern graphics processing units, built with a custom lightweight scrollytelling engine.

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (React)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Typography:** Geist (Sans & Mono)

## 🎬 The Scrollytelling Architecture

We purposefully avoided heavy pinning libraries (like GSAP or Lenis) in favor of a native, highly performant CSS and React-based architecture. Here is how the documentary-style scrolling is achieved:

### 1. The "Sticky Stacking" Strategy (CSS)
Instead of hijacking global scroll, the page scrolls natively. Inside each section (`GpuDieSection`, `VrmSection`, etc.), there is an inner container set to `sticky top-0 h-screen`. This forms a "stage" that freezes exactly within your viewport while you continue scrolling through the invisible height padding of the outer section wrapper (e.g., `h-[600vh]`).

### 2. Scroll-Linked Values (`useScroll`)
Inside those frozen stages, we attach Framer Motion’s `useScroll` hook to the section's bounding box. This outputs a highly optimized raw value between `0.0` (start) and `1.0` (end) representing precisely how far down that specific component the user has scrolled. 

### 3. Declarative Transforms (`useTransform`)
Rather than time-based durations, we map that `0` to `1` scroll fraction directly into CSS properties. We declare maps like: *"When scroll is at 20%, opacity is 0. At 35%, opacity is 1."* This strictly binds the animation timeline to the mouse wheel. If you scroll backward, the animation plays perfectly in reverse at the exact speed of your finger.

### 4. Cinematic Crossfades (`SectionTransition.tsx`)
Because vertical hard-cuts feel disjointed, every section is wrapped in `SectionTransition`. This wrapper tracks its own bounding box to trigger an overlapping exit/entry crossfade. 
- As a section enters the bottom 12% of the screen, it fades in and shifts up (parallax).
- As it leaves the top 12%, it fades out to black and scales down to 97%.
This means the exit of the previous section perfectly overlaps the entry of the next.

### 5. Adaptive Navigation (`ScrollProgress` & `Navbar`)
The `NaN` / `ScrollProgress` nodes calculate intersections manually. They query `window.scrollY` and measure which section's absolute center is mathematically closest to the `window.innerHeight / 2`. The active dot updates fluidly, and clicking any node fires a native `scrollIntoView({ behavior: 'smooth' })` to let the browser execute a perfect, performant glide to that chapter.

## 🛠️ Development

To run the project locally:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the experience.
