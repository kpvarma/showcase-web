import Tesseract from "tesseract.js";

/**
 * Processes a list of image files or data (URLs, strings, etc.) and extracts text using Tesseract.js.
 * @param {(File[] | string[])} imageFiles - List of image files (Blob, File) or URLs/base64 strings to process.
 * @param {Function} onProgress - Callback for progress updates.
 * @returns {Promise<Object[]>} - List of objects containing file name and extracted text.
 */
export const ExtractTextFromImages = async (imageFiles, onProgress) => {
  const results = [];

  for (const file of imageFiles) {
    let fileData;

    // Handle different file types
    if (file instanceof Blob) {
      // Convert Blob/File to Data URL
      fileData = await new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.onerror = () => reject(new Error("Failed to read file."));
        fileReader.readAsDataURL(file);
      });
    } else if (typeof file === "string") {
      // Assume string is a URL or base64; pass it directly
      fileData = file;
    } else {
      throw new Error(`Unsupported file type: ${typeof file}. Must be Blob/File or URL.`);
    }

    // Perform OCR with Tesseract.js
    try {
      const { data } = await Tesseract.recognize(fileData, "eng", {
        logger: onProgress,
      });

      results.push({
        name: file.name || `Image-${Date.now()}.txt`, // Use file.name if available; fallback to a generated name
        text: data.text,
      });
    } catch (error) {
      console.error(`Failed to process file: ${file.name || 'Unknown'}`, error);
    }
  }

  return results;
};