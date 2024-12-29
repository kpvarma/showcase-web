const fs = require("fs");
const path = require("path");
const metaTagData = require("./meta_tag_data");

// Read the template `index.html` from the `public` folder
const template = fs.readFileSync(path.resolve(__dirname, "public/index.html"), "utf-8");

// Generate static HTML files for each route
Object.entries(metaTagData).forEach(([route, meta]) => {
  const updatedHtml = template
    .replace(/__TITLE__/g, meta.title)
    .replace(/__DESCRIPTION__/g, meta.description)
    .replace(/__IMAGE__/g, meta.image)
    .replace(/__URL__/g, `https://kpvarma.com${route}`);

  // Generate output directory and write the updated HTML
  const outputDir = path.resolve(__dirname, `build${route}`);
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, "index.html"), updatedHtml);
});

console.log("Static HTML files generated successfully!");