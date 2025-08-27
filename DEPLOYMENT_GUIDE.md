# 🚀 Farm UI Deployment Guide

This guide covers the complete workflow for deploying your Angular application to GitHub Pages, from initial setup to automatic deployment.

## 📋 Table of Contents
1. [Initial Setup](#initial-setup)
2. [Development Workflow](#development-workflow)
3. [Manual Deployment](#manual-deployment)
4. [Automatic Deployment](#automatic-deployment)
5. [Troubleshooting](#troubleshooting)

---

## 🛠️ Initial Setup

### Prerequisites
- Node.js and npm installed
- Git installed and configured
- GitHub account
- Angular CLI installed globally: `npm install -g @angular/cli`

### First Time Setup
```bash
# Clone your repository (if not already done)
git clone <your-repo-url>
cd <your-repo-name>

# Install dependencies
npm install

# Verify Angular CLI is working
ng version
```

---

## 🔄 Development Workflow

### 1. Make Your Changes
```bash
# Start development server
npm start

# Or use the watch mode for automatic rebuilds
npm run watch
```

### 2. Test Your Changes
```bash
# Run tests
npm test

# Build locally to test production build
npm run build
```

### 3. Commit Your Changes
```bash
# Check what files have changed
git status

# Add all changes
git add .

# Or add specific files
git add src/app/your-component/

# Commit with descriptive message
git commit -m "feat: add new farm management feature"

# Push to GitHub
git push origin main
```

---

## 🚀 Manual Deployment

### Option 1: Using npm script (Recommended)
```bash
# Deploy using the predefined script
npm run deploy
```

This command does two things:
1. Builds your app for production: `ng build --configuration production`
2. Deploys to GitHub Pages: `gh-pages -d dist/farm_ui/browser -b gh-pages`

### Option 2: Step by step deployment
```bash
# Step 1: Build for production
ng build --configuration production

# Step 2: Deploy to GitHub Pages
npx gh-pages -d dist/farm_ui/browser -b gh-pages
```

### What Happens During Manual Deployment
1. **Build Process**: Angular creates optimized production bundles
2. **Output**: Files are generated in `dist/farm_ui/` folder
3. **Deployment**: `gh-pages` tool pushes the `browser` folder to `gh-pages` branch
4. **Live Update**: GitHub Pages serves your app from the `gh-pages` branch

---

## ⚡ Automatic Deployment

### Setting Up GitHub Actions (Recommended)

Create a `.github/workflows/deploy.yml` file in your project:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist/farm_ui/browser
        publish_branch: gh-pages
```

### Benefits of Automatic Deployment
- ✅ **Zero Manual Work**: Deploys automatically on every push to main
- ✅ **Consistent Process**: Same deployment process every time
- ✅ **Team Collaboration**: Anyone can push and deploy
- ✅ **Rollback Easy**: Previous versions are preserved

---

## 📁 Project Structure After Deployment

```
your-project/
├── src/                    # Source code
├── dist/                   # Build output
│   └── farm_ui/
│       ├── browser/        # Client-side files (deployed to GitHub Pages)
│       └── server/         # Server-side files
├── .github/
│   └── workflows/          # GitHub Actions (if using auto-deploy)
│       └── deploy.yml
├── package.json            # Dependencies and scripts
└── angular.json            # Angular configuration
```

---

## 🔧 Available npm Scripts

```json
{
  "scripts": {
    "start": "ng serve",                    // Development server
    "build": "ng build",                    // Build for development
    "watch": "ng build --watch",            // Build with file watching
    "test": "ng test",                      // Run tests
    "deploy": "ng build --configuration production && gh-pages -d dist/farm_ui/browser -b gh-pages"
  }
}
```

---

## 🌐 Accessing Your Live Application

### GitHub Pages URL
Your app will be available at:
```
https://<your-username>.github.io/<your-repo-name>/
```

### Custom Domain (Optional)
You can set up a custom domain in your repository settings:
1. Go to Settings → Pages
2. Add your custom domain
3. Update DNS records

---

## 🚨 Troubleshooting

### Common Issues

#### 1. Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### 2. Deployment Fails
```bash
# Check if gh-pages is installed
npm list gh-pages

# Reinstall if needed
npm install --save-dev gh-pages
```

#### 3. Changes Not Visible
- Wait 5-10 minutes for GitHub Pages to update
- Check the `gh-pages` branch in your repository
- Clear browser cache
- Check GitHub Pages settings in repository

#### 4. CSS Budget Warnings
These are performance warnings, not errors. Your app will still deploy:
```bash
# To increase budget, update angular.json
"budgets": [
  {
    "type": "initial",
    "maximumWarning": "2mb",
    "maximumError": "5mb"
  }
]
```

---

## 📝 Quick Reference Commands

### Daily Development
```bash
npm start              # Start dev server
npm run watch          # Build with watching
npm test               # Run tests
```

### Before Committing
```bash
npm run build          # Test production build
npm test               # Ensure tests pass
```

### Deployment
```bash
npm run deploy         # Manual deployment
git push origin main   # Trigger auto-deployment (if configured)
```

---

## 🎯 Best Practices

1. **Always test locally** before deploying
2. **Use descriptive commit messages**
3. **Keep dependencies updated**
4. **Monitor build sizes** and performance
5. **Set up automatic deployment** for production
6. **Use feature branches** for major changes
7. **Test on different devices** after deployment

---

## 📞 Need Help?

- **GitHub Issues**: Check your repository's issues
- **Angular Documentation**: [angular.io](https://angular.io/)
- **GitHub Pages**: [pages.github.com](https://pages.github.com/)
- **GitHub Actions**: [docs.github.com/en/actions](https://docs.github.com/en/actions)

---

*Last updated: $(date)*
*This guide covers the complete deployment workflow for Farm UI Angular application.*
