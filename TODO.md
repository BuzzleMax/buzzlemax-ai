# Fix demo video + pathing audit (BuzzleMax)

## Steps
- [ ] Audit repo for references to demo video + /videos paths (search_files; fallback if unavailable)
- [ ] Fix Demo.tsx to use import.meta.env.BASE_URL and required <video> markup
- [ ] Fix BrowserRouter basename in src/main.tsx
- [ ] Fix vite config base path (GitHub Pages)
- [ ] Fix public/site.webmanifest JSON and icon paths
- [ ] Fix index.html asset/manifest paths (remove duplicate base paths if any)
- [ ] Remove duplicate base paths across repo
- [x] Verify local: request /videos/buzzlemax-ai-demo.mp4 returns 200
- [ ] Verify Demo section plays video (no 404, no black/white)

- [ ] Produce final report: modified files, lines changed, root cause, verification results

