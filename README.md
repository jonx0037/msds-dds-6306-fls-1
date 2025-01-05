# Unit 1 Presentation

A Next.js-based slideshow presentation for DDS 6306 Unit 1 Analysis.

## Development

To run the development server:

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to GitHub Pages

This presentation is configured to automatically deploy to GitHub Pages when changes are pushed to the main branch. The deployment process is handled by GitHub Actions.

To deploy:

1. Push your changes to the main branch
2. GitHub Actions will automatically build and deploy the site
3. The site will be available at: `https://jonx0037.github.io/msds-dds-6306-fls-1/`

## Using the Presentation

- Use the left and right arrow buttons to navigate between slides
- The presentation is fully responsive and works on mobile devices
- Current slide number is displayed at the bottom

## Project Structure

- `src/components/Unit1Presentation.tsx` - Main presentation component
- `src/components/ui/card.tsx` - Reusable card component
- `src/app/` - Next.js app directory containing pages and layouts
- `.github/workflows/deploy.yml` - GitHub Actions workflow for deployment

## Technologies Used

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- GitHub Actions for CI/CD
