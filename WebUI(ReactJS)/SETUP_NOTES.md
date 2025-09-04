# WebUI(ReactJS) Setup Notes

This project uses Create React App (react-scripts). The container setup previously failed due to dependency duplication and missing public assets.

What was fixed:
- Removed duplicated @tailwindcss/forms and @tailwindcss/typography from devDependencies (kept only in dependencies).
- Declared Node engines: >=16 for predictable installs in CI.
- Added required CRA public files: public/index.html and public/manifest.json.
- Added .env.example to document required environment variables.

How to run locally:
1. Copy .env.example to .env and adjust values.
2. Install dependencies:
   CI=true npm install
3. Start dev server:
   npm start

If installation fails:
- Ensure Node 16+ is used.
- Clear cache and retry:
  rm -rf node_modules package-lock.json && CI=true npm install
