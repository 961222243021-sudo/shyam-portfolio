# Shyam J Portfolio

Animated English/Tamil portfolio built with Svelte 5, SvelteKit, GSAP and Lenis. All source, images, fonts, sound and video are included.

## Vercel deployment

1. Import this repository into Vercel.
2. Keep Root Directory at the repository root.
3. The included vercel.json selects **Other**, runs **npm ci**, builds with **npm run build**, and publishes **dist**.
4. Select Node.js **22.x**. No environment variables or database required.
5. Deploy. Future pushes to the production branch trigger deployment.

## Local development

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run preview
```

## Pages

- `/`: portfolio, projects, experience, research and contact.
- `/bored/`: cinema video.
- `/destroy/`: destruction and restoration sequence.
- `/feedback/`: local sticky-note demo. Pinning triggers Thanos destruction. Notes are never transmitted or saved.
- `/404/`: animated error page; the build also emits 404.html.

Mobile and tablet visitors see the desktop welcome screen. Browsers may require a gesture before audio plays.

## Editing

Main content: src/routes/+page.svelte. Components: src/lib/components/. Styling: src/lib/styles/portfolio.css. Media and resume: static/.

## License and assets

Adapted from the Apache-2.0 licensed althruist/Portfolio. Preserve LICENSE, NOTICE and ASSET-SOURCES.md. Personal content and added animations are customized for Shyam J. Third-party images retain their respective ownership.

## Cinema source

The large cinema video is stored in media-source/ as binary parts. The build reassembles the byte-identical original MP4 and verifies its SHA-256 before Vite runs. No quality is lost. Run npm run build before using the video locally.
