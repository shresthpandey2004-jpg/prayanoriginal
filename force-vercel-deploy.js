#!/usr/bin/env node

/**
 * Force Vercel Deployment Script
 * Run this to trigger a fresh deployment
 */

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Forcing Vercel deployment...');

try {
  // Update timestamp to trigger deployment
  const timestamp = new Date().toISOString();
  fs.writeFileSync('.vercel-trigger', `Deployment triggered at: ${timestamp}`);
  
  console.log('📝 Updated .vercel-trigger file');
  
  // Git operations
  execSync('git add .vercel-trigger', { stdio: 'inherit' });
  execSync(`git commit -m "🚀 Force deployment: ${timestamp}"`, { stdio: 'inherit' });
  execSync('git push', { stdio: 'inherit' });
  
  console.log('✅ Successfully pushed to trigger deployment');
  console.log('🔍 Check Vercel dashboard for deployment status');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}