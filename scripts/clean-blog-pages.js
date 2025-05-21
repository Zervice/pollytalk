/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
/* eslint-enable @typescript-eslint/no-require-imports */

/**
 * Clean up generated blog pages
 * This script removes all generated blog page folders from src/app/blog/
 * while preserving the main blog index page (page.tsx)
 */

// Path to blog directory
const blogDir = path.join(process.cwd(), 'src/app/blog');

// Function to delete a directory recursively
function deleteFolderRecursive(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // Recursive call for directories
        deleteFolderRecursive(curPath);
      } else {
        // Delete file
        fs.unlinkSync(curPath);
      }
    });
    // Delete empty directory
    fs.rmdirSync(folderPath);
  }
}

// Main function to clean blog pages
function cleanBlogPages() {
  console.log('Cleaning generated blog pages...');
  
  try {
    // Check if blog directory exists
    if (!fs.existsSync(blogDir)) {
      console.log('Blog directory does not exist. Nothing to clean.');
      return;
    }
    
    // Get all subdirectories in the blog directory
    const items = fs.readdirSync(blogDir);
    
    // Filter out the non-directories and the main page.tsx file
    const subDirs = items.filter(item => {
      const itemPath = path.join(blogDir, item);
      return fs.statSync(itemPath).isDirectory();
    });
    
    if (subDirs.length === 0) {
      console.log('No generated blog pages found. Nothing to clean.');
      return;
    }
    
    // Delete each subdirectory
    let count = 0;
    subDirs.forEach(dir => {
      const dirPath = path.join(blogDir, dir);
      deleteFolderRecursive(dirPath);
      count++;
      console.log(`Deleted: ${dir}`);
    });
    
    console.log(`Successfully cleaned ${count} generated blog page${count !== 1 ? 's' : ''}.`);
  } catch (error) {
    console.error('Error cleaning blog pages:', error.message);
    process.exit(1);
  }
}

// Run the cleaner
cleanBlogPages();
