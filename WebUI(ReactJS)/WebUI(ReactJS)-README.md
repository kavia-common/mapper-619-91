# Mapper WebUI (ReactJS)

Production-ready React app for Mapper Design Studio.

Features:
- Secure login, registration, and onboarding
- Role-based access and dashboards
- YANG model browsing
- API schema creation and management
- Mapping tools
- Template management
- Service provisioning
- Notifications and contextual help
- Robust error handling and accessibility
- Cypress E2E tests

Requirements:
- Node.js 16+ (LTS)
- Yarn or npm

Setup:
1. Copy .env.example to .env and set values.
2. Install dependencies:
   npm install
3. Start development:
   npm start
4. Build:
   npm run build
5. Run Cypress UI:
   npm run cypress:open
6. Run Cypress headless:
   npm run cypress:run

Environment variables:
- REACT_APP_API_URL: Backend REST API base URL (e.g., http://localhost:8000/api)
- REACT_APP_WS_URL: WebSocket base URL for notifications (e.g., ws://localhost:8000/ws)
- REACT_APP_SITE_URL: Site URL for redirect logic (e.g., http://localhost:3000)

Security and Accessibility:
- All API calls use Axios instance with auth interceptors.
- Local storage is used for token and user; consider rotating tokens with short TTLs.
- Visual focus outline, reduced motion, and high-contrast support.
- Roles and permissions are enforced in ProtectedRoute and can be extended to RBAC-aware components.

Project Structure:
- src/services: REST API client services
- src/store: Redux Toolkit state management
- src/pages: Route pages
- src/components: Reusable UI and layout components
- cypress: E2E tests

CI Notes:
- Use CI=true npm test for unit tests (if added).
- Cypress runs with npm run cypress:run.
