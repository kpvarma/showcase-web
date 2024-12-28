// utils/imageLibrary.js
const imagesFolder = '/images'
const s3URl = 'https://s3.us-east-1.amazonaws.com/assets.kpvarma.com'
// const s3URl = 'https://assets.kpvarma.com'

const image_mapping = {
    // Mapping of image keys to file names
    
    // Background Images
    coders_desk: "backgrounds/coders_desk.png",

    // Display Images (Displayed on various pages)
    about_me: "displays/about_me.avif",

    machineLearning: 'displays/machine-learning.png',
    dataScience: 'displays/data-science.png',
    devops: 'displays/devops.png',
    dataAnalysis: 'displays/data-analysis.png',

    hireme1: 'displays/hireme1.png',
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
      return `${s3URl}${imagesFolder}/${folder}/${imageName}`;
    }
  };
  
  const getLogoUrl = (logoFileName) => {
    if (!logoFileName) {
      throw new Error("Logo filename is required.");
    }

    if (process.env.NODE_ENV === "development") {
      return `${imagesFolder}/${logoFileName}`;
    } else {
      return `${s3URl}${imagesFolder}/${logoFileName}`;
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
      return `${s3URl}${imagesFolder}/${fileName}`;
    }
  };
  
  const imageLibrary = new Proxy(
    {
      getLogoImage: (imageFileName = 'logo.png') => getLogoUrl(imageFileName),
      getProjectImage: (imageFileName) => getDynamicImageUrl('projects', imageFileName),
      getDemoImage: (imageFileName) => getDynamicImageUrl('demos', imageFileName),
      getArticleImage: (imageFileName) => getDynamicImageUrl('articles', imageFileName),
      getLinkPreviewImage: (imageFileName) => getDynamicImageUrl('link-previews', imageFileName),
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