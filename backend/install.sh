#!/bin/bash
# Manifest Backend Installation Script

echo "🚀 Installing Manifest backend..."

# Install Manifest CLI and dependencies
npm install -g @mnfst/cli
npm install

# Initialize Manifest backend (this creates the proper structure)
echo "📦 Initializing Manifest backend..."
npx @mnfst/cli init --backend

# Set up the database
echo "🗄️ Setting up database..."
npx @mnfst/cli db:migrate

echo "✅ Manifest backend installation complete!"
echo "🎯 Your backend is ready to run with: npm start"
