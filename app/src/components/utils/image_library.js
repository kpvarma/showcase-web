// utils/imageLibrary.js
const imagesFolder = '/images/'

const image_mapping = {
    // Mapping of image keys to file names
    
    // Background Images
    coders_desk: "backgrounds/coders_desk.png",

    // Display Images (Displayed on various pages)
    about_me: "displays/about_me.png",

    machineLearning: 'displays/machine-learning.png',
    dataScience: 'displays/data-science.png',
    devops: 'displays/devops.png',
    dataAnalysis: 'displays/data-analysis.png',

    hireme1: 'displays/hireme2.png',
    hireme2: 'displays/hireme2.png',
    hireme3: 'displays/hireme3.png',
  };
  
  const getDynamicImageUrl = (folder, imageName) => {
    if (!imageName) {
      throw new Error("Image name is required.");
    }
  
    if (process.env.NODE_ENV === "development") {
      return `${imagesFolder}/${folder}/${imageName}`;
    } else {
      console.log(`https://assets.kpvarma.com/${imagesFolder}/${folder}/${imageName}`);
      return `https://assets.kpvarma.com/${imagesFolder}/${folder}/${imageName}`;
    }
  };
  
  const getLogoUrl = (logoFileName) => {
    if (!logoFileName) {
      throw new Error("Logo filename is required.");
    }

    if (process.env.NODE_ENV === "development") {
      return `${imagesFolder}/${logoFileName}`;
    } else {
      return `https://assets.kpvarma.com/${imagesFolder}/${logoFileName}`;
    }
  };
  
  const getImageUrl = (imageName) => {
    const fileName = image_mapping[imageName];
    if (!fileName) {
      throw new Error(`Image "${imageName}" not found in the image mapping.`);
    }
  
    if (process.env.NODE_ENV === "development") {
      return `${imagesFolder}/${fileName}`;
    } else {
      return `https://assets.kpvarma.com/${fileName}`;
    }
  };
  
  const imageLibrary = new Proxy(
    {
      getLogoImage: (imageFileName = 'logo.png') => getLogoUrl(imageFileName),
      getProjectImage: (imageFileName) => getDynamicImageUrl('projects', imageFileName),
      getArticleImage: (imageFileName) => getDynamicImageUrl('articles', imageFileName),
    },
    {
      get: (target, prop) => {
        if (target[prop]) {
          return target[prop];
        }
        return getImageUrl(prop);
      },
    }
  );
  
  export default imageLibrary;