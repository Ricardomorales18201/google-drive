Google Drive Integration Application
This Angular application allows users to interact with their Google Drive accounts to view, upload, download, and delete files through Google OAuth. Styled with Tailwind CSS, it provides a responsive and user-friendly experience.

Table of Contents
Overview
Features
Setup and Installation
Running the Application
Assumptions and Design Decisions
Overview
This application provides seamless integration with Google Drive using the Google Drive API and Angular standalone components. Users can authenticate using Google OAuth and manage their Google Drive files directly through the application.

Features
OAuth 2.0 Authentication: Securely log in with Google to access Google Drive files.
File Management: View, upload, download, and delete files.
Responsive UI: Tailwind CSS styling for a clean, accessible layout.
Setup and Installation
Prerequisites
Node.js: Version 14 or higher.
Google Cloud Project: Enable Google Drive API and create OAuth credentials.
Installation Steps
Clone the Repository:

bash
Copy code
git clone <repository-url>
cd google-drive-integration
Install Dependencies:

bash
Copy code
npm install
Configure OAuth:

Open src/app/services/google-drive.service.ts.
Replace 'YOUR_GOOGLE_CLIENT_ID' with your Google OAuth Client ID.
Ensure your Redirect URI is set in Google Cloud Console (e.g., http://localhost:4200 for local development).
Set Up Environment Variables (Optional):

To use environment-specific variables, create src/environments/environment.ts and add necessary configurations.
Set Up Cypress for E2E Testing (Optional):

Install Cypress:
bash
Copy code
npm install cypress --save-dev
Open Cypress Test Runner:
bash
Copy code
npx cypress open
Running the Application
Start the Development Server:

bash
Copy code
ng serve
Visit the app at http://localhost:4200.

Run Unit Tests:

bash
Copy code
ng test
Run End-to-End Tests (if using Cypress):

bash
Copy code
npx cypress open
Assumptions and Design Decisions
Google Authentication: Google OAuth 2.0 is implemented to securely authenticate users.

Error Handling:

The app logs errors to the console for easy debugging.
A 403 error response (e.g., missing API key) prompts users to check authentication.
Browser Environment Check: The window object is accessed only in the browser environment using Angular’s isPlatformBrowser, which is helpful for server-side rendering or test environments.

Styling: Tailwind CSS is used for responsive styling with accessibility in mind.

Standalone Components: Angular 18 standalone components simplify the app structure and reduce dependency on traditional modules.

Testing Framework: Cypress is chosen over Protractor for end-to-end testing due to its modern feature set and ease of integration.

