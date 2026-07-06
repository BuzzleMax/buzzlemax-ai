import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Manual deployment to gh-pages branch to avoid ENAMETOOLONG error on Windows
// The gh-pages package fails on Windows due to path length limitations
// This script uses git worktree to deploy without the path issue

const distPath = path.resolve('dist');
const worktreePath = path.resolve('gh-pages-deploy');

try {
  // Check if dist exists
  if (!fs.existsSync(distPath)) {
    console.error('Error: dist folder not found. Run npm run build first.');
    process.exit(1);
  }

  // Remove any existing worktree
  try {
    execSync('git worktree remove gh-pages-deploy', { stdio: 'ignore' });
  } catch (e) {
    // Worktree doesn't exist, that's fine
  }

  // Create worktree from gh-pages branch (or create orphan branch)
  try {
    execSync('git worktree add gh-pages-deploy gh-pages', { stdio: 'ignore' });
  } catch (e) {
    // Branch doesn't exist, create orphan branch
    execSync('git worktree add gh-pages-deploy -b gh-pages', { stdio: 'ignore' });
  }

  // Clean the worktree (remove all files)
  try {
    execSync('git rm -rf .', { cwd: worktreePath, stdio: 'ignore' });
  } catch (e) {
    // Ignore errors
  }

  // Copy dist contents to worktree
  const copyRecursive = (src, dest) => {
    const stat = fs.statSync(src);
    if (stat.isDirectory()) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      const files = fs.readdirSync(src);
      for (const file of files) {
        copyRecursive(path.join(src, file), path.join(dest, file));
      }
    } else {
      fs.copyFileSync(src, dest);
    }
  };

  const distFiles = fs.readdirSync(distPath);
  for (const file of distFiles) {
    copyRecursive(path.join(distPath, file), path.join(worktreePath, file));
  }

  // Copy CNAME file
  const cnamePath = path.resolve('public/CNAME');
  if (fs.existsSync(cnamePath)) {
    fs.copyFileSync(cnamePath, path.join(worktreePath, 'CNAME'));
  }

  // Copy _config.yml file to override GitHub Pages baseurl
  const configPath = path.resolve('_config.yml');
  if (fs.existsSync(configPath)) {
    fs.copyFileSync(configPath, path.join(worktreePath, '_config.yml'));
  }

  // Add and commit
  execSync('git add -A', { cwd: worktreePath, stdio: 'inherit' });
  try {
    execSync('git commit -m "Deploy to GitHub Pages"', { cwd: worktreePath, stdio: 'inherit' });
  } catch (e) {
    // Nothing to commit
  }

  // Push to gh-pages branch
  execSync('git push origin gh-pages --force', { stdio: 'inherit' });

  // Remove worktree
  execSync('git worktree remove gh-pages-deploy', { stdio: 'ignore' });

  console.log('Deploy complete!');
} catch (err) {
  console.error('Deploy error:', err.message);
  // Clean up on error
  try {
    execSync('git worktree remove gh-pages-deploy', { stdio: 'ignore' });
  } catch (e) {
    // Ignore
  }
  process.exit(1);
}