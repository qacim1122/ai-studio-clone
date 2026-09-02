# AI Studio — Landing Page Clone

Recreation of the landing page shown in `ai-studio.mp4`, built with Next.js 14
(App Router), TypeScript, Tailwind CSS, GSAP + ScrollTrigger, and Lenis for
smooth scrolling.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

```
app/
  layout.tsx        Root layout, loads global CSS
  page.tsx           Assembles all sections in order
  globals.css        Global styles, keyframes, custom utility classes
components/
  SmoothScroll.tsx    Lenis smooth-scroll provider + GSAP ticker sync
  Navbar.tsx          Fixed pill navigation (persists across all sections)
  Hero.tsx            Section 1 — rounded hero card, 3D scroll-out flip
  Marquee.tsx         Looping background headline text (section 2)
  CardCarousel.tsx    Autoplaying 3D coverflow card carousel (section 2)
  BeyondSection.tsx   "Beyond all limits" heading + particle sphere (section 3)
  ParticleSphere.tsx  Canvas particle sphere that disperses on scroll
  ProjectGallery.tsx  Horizontal pinned-scroll project showcase (section 3)
  ScatterGallery.tsx  Horizontal pinned-scroll scattered image gallery (section 4)
  FinalCTA.tsx        Closing CTA with chrome star SVG (section 5)
```

## Asset placeholders

The source video is heavily compressed and only ~7 seconds long, so none of
the underlying photographs/renders could be losslessly extracted. Every image
in this project is a labeled gradient placeholder (visible as
`[ IMAGE PLACEHOLDER: ... ]` text) sized and positioned to match what's shown
in the video. Swap these out with the real assets by:

1. Dropping files into `public/images/`.
2. Replacing the placeholder `<div>` background in the relevant component
   with an `<Image src="/images/your-file.jpg" fill className="object-cover" />`.

Placeholders map to source video content as follows:

| Component | Placeholder | Video content |
|---|---|---|
| `Hero.tsx` | hero image | Abstract draped-fabric/rock portrait, warm backlight, water reflection |
| `CardCarousel.tsx` → `templates` | card bg | Portrait with green rim-light |
| `ProjectGallery.tsx` → Urchin | slide bg | Blue-toned floral cascade over rocks |
| `ProjectGallery.tsx` → Zumar | slide bg | Mirrored light tunnel, walking silhouette |
| `ProjectGallery.tsx` → Nova | slide bg | Desert dunes, starlit purple sky |
| `ScatterGallery.tsx` | 7 cards | Assorted portraits + "Nano Banana" / "Midjourney" AI-tool cards |

## Notes on interactions/animations

- **Hero → Carousel transition**: the hero card rotates back in 3D
  (`rotateX`) and fades as the user scrolls past it, mirroring the flip seen
  in the source video.
- **Card carousel**: autoplays every 3.2s through 4 cards in a coverflow
  layout (center card full scale/opacity, neighbors receded in Z and
  rotated on the Y axis).
- **Particle sphere**: canvas-based; sits in a tight sphere at rest and
  disperses into a scattered field as the section scrolls through view,
  matching the source video's dissolve-into-particles moment.
- **Project gallery / scatter gallery**: both use GSAP `ScrollTrigger` with
  `pin: true` to convert vertical scroll into horizontal translation across
  a wide inner track, matching the horizontal pans in the video.

All motion respects `prefers-reduced-motion` (see `globals.css`).
