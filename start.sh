#!/bin/bash

# SRTdash Bootstrap 5 + Vite Development Server
echo "🚀 Starting SRTdash Admin Dashboard..."
echo "📦 Bootstrap 5 + Vite 7 + Handlebars"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📥 Installing dependencies..."
    npm install
fi

echo "✨ Starting development server..."
echo "📍 URL: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo "----------------------------------------"

# Start Vite with cleaner output
npm run dev 2>&1 | grep -v "Failed to load source map"