import { PDFDocument } from 'pdf-lib';

/**
 * Stitch multiple PDFs into a single PDF.
 * @param {File[]} pdfFiles - Array of PDF files to stitch.
 * @returns {Blob} - A Blob of the stitched PDF.
 */
export const stitchPDFs = async (pdfFiles) => {
  const mergedPdf = await PDFDocument.create();

  for (const file of pdfFiles) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  const pdfBytes = await mergedPdf.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
};