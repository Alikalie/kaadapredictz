# KAADA PREDICTZ implementation plan

## Goal
Build a complete, dynamic sports-prediction publishing platform with a premium pink-and-black identity. Public content, navigation, promotions, predictions, results, VIP packages, articles, advertisements, and site settings will be managed through a protected administration area rather than hard-coded.

## Public website
- Create a responsive shared header, mobile navigation, footer, responsible-betting notice, and active navigation states.
- Build distinct pages for Home, Predictions, dynamic prediction categories, prediction details, VIP, Tips & Guides, article details, Results, About, Contact, and legal information.
- Make the home page editorial and data-rich: featured match, market shortcuts, today’s tips, performance summary, VIP promotion, latest guides, ad placements, and newsletter signup.
- Use mobile-friendly match cards and a compact desktop prediction table with clear league, kickoff, teams, market, odds, and result status.
- Add unique metadata to every public page, stable slugs, and indexable route structure.

## Brand and experience
- Establish a black, near-black, vivid pink, soft gray, and off-white design system with bold sports typography and restrained motion.
- Create a distinctive KAADA PREDICTZ wordmark, score/status treatments, market chips, and match-focused visual hierarchy.
- Keep advertising visible but clearly separated from editorial and prediction content.
- Include responsible-betting, age, and past-performance disclaimers without presenting predictions as guaranteed outcomes.

## Data and content system
- Model leagues, teams, matches, prediction categories, markets, predictions, results, articles, article categories, VIP packages, memberships, advertisements, feedback and replies, navigation, footer groups, social links, FAQs, newsletter subscribers, page sections, site settings, and SEO settings.
- Seed the database with realistic demonstration content so every public page is complete on first load.
- Allow new markets and categories to generate public category views automatically.
- Calculate performance statistics from stored results and generate readable feedback reference numbers.

## Accounts, roles, and security
- Add email/password and Google sign-in.
- Protect the administration area and store roles separately from profiles.
- Implement Super Admin, Content Admin, Support Admin, and Prediction Analyst permissions with database-enforced access rules.
- Record sensitive management actions in an audit trail.

## Administration area
- Build an overview with prediction, performance, article, membership, and feedback summaries.
- Add working management screens for predictions and results, markets and categories, articles, VIP packages, advertisements, feedback, navigation/footer, pages/sections, FAQs, social links, and site/SEO settings.
- Support create, edit, publish/unpublish, reorder, status updates, and deletion where appropriate.
- Include a practical section-order editor for configurable page sections and an attachment-ready feedback workflow.

## Technical details
- Keep TanStack Start routing and create separate route files for all major pages.
- Use Lovable Cloud for persistent data, authentication, and storage with row-level access rules and explicit grants.
- Use typed client queries for public reads and protected server functions for management operations.
- Add loading, empty, error, validation, and permission-denied states.
- Verify desktop and mobile layouts, route navigation, authentication boundaries, public data loading, admin workflows, and current build diagnostics.

## Delivery order
1. Design system, schema, roles, policies, and seed content.
2. Shared public layout and all public routes.
3. Authentication and protected administration shell.
4. Management workflows and configurable sections.
5. SEO/compliance details and end-to-end verification.
