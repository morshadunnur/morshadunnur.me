# Morshadun Nur - Shopify Developer Portfolio

This is the source code for my personal portfolio website built with Astro.

## Mobile-First Design

This portfolio follows mobile-first design principles:

- Responsive layouts that adapt to all device sizes
- Mobile navigation with a toggle button in the top-right corner
- Slide-in sidebar menu for mobile devices
- Optimized images and performance for mobile users
- Touch-friendly UI elements and appropriate spacing

## Contact Form Integrations

The contact form on this website integrates with:

1. Netlify Forms (default)
2. Google Sheets (for data storage)
3. Discord (for notifications)

### Setting up Google Sheets Integration

1. Go to [Google Apps Script](https://script.google.com/)
2. Create a new project
3. Copy and paste the code from `scripts/google-sheets-integration.js`
4. Create a new Google Sheet and copy its ID (the long string in the URL)
5. Replace `YOUR_GOOGLE_SHEET_ID` in the script with your actual Sheet ID
6. Deploy the script as a web app:
   - Click on "Deploy" > "New deployment"
   - Select "Web app" as the type
   - Set "Who has access" to "Anyone"
   - Click "Deploy"
7. Copy the web app URL and update it in `src/pages/contact.astro`

### Setting up Discord Notifications

1. In your Discord server, go to Server Settings > Integrations > Webhooks
2. Create a new webhook and copy the webhook URL
3. Replace `YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN` in `src/pages/contact.astro` with your actual webhook URL

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Technologies Used

- [Astro](https://astro.build) - The web framework for content-driven websites
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [MDX](https://mdxjs.com) - Markdown for the component era
- [Sharp](https://sharp.pixelplumbing.com/) - High performance image processing

## Deployment

This site is configured for deployment on Netlify:

1. Push your repository to GitHub
2. Connect your repository to Netlify
3. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Configure environment variables if needed
5. Deploy!

## Project Structure
/
├── public/             # Static assets
├── scripts/            # Utility scripts
├── src/
│   ├── components/     # UI components
│   ├── content/        # Content collections (blog posts)
│   ├── layouts/        # Page layouts
│   └── pages/          # Page components
└── package.json        # Project dependencies

```plaintext
```
## License

MIT