import * as pdfjsLib from "pdfjs-dist";

// Set up the worker for PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = "https://unpkg.com/pdfjs-dist@4.0.379/build/pdf.worker.min.mjs";

/**
 * Extracts metadata from a file.
 * Supports basic metadata for all files and advanced metadata for PDFs.
 *
 * @param {File} file - The file to extract metadata from.
 * @returns {Promise<Object>} - An object containing file metadata.
 */
export const extractFileMetaData = async (file) => {
  const metadata = {
    name: file.name,
    size: (file.size / 1024).toFixed(2) + " KB",
    type: file.type,
    createdAt: file.lastModified
      ? new Date(file.lastModified).toLocaleString()
      : "Unknown",
  };

  if (file.type === "application/pdf") {
    const arrayBuffer = await file.arrayBuffer(); // Convert File to ArrayBuffer
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    metadata.pages = pdf.numPages;

    let imagesCount = 0;
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const ops = await page.getOperatorList();
      imagesCount += ops.fnArray.filter((fn) => fn === pdfjsLib.OPS.paintJpegXObject).length;
    }
    metadata.images = imagesCount;
  }

  return metadata; // Return metadata for the parent component to handle
};