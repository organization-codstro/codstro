import imageCompression from "browser-image-compression";

/** 이미지 압축 */
const compressImage = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  const compressed = await imageCompression(file, options);

  return new File([compressed], file.name, {
    type: compressed.type,
  });
};

/** PDF 압축 */
const compressPdf = async (file: File): Promise<File> => {
  const { PDFDocument } = await import("pdf-lib");

  const arrayBuffer = await file.arrayBuffer();

  const pdfDoc = await PDFDocument.load(arrayBuffer, {
    ignoreEncryption: true,
  });

  const compressedBytes = await pdfDoc.save({
    useObjectStreams: true,
  });

  const buffer = compressedBytes.buffer.slice(
    compressedBytes.byteOffset,
    compressedBytes.byteOffset + compressedBytes.byteLength,
  ) as ArrayBuffer;

  return new File([buffer], file.name, {
    type: "application/pdf",
  });
};

const passThrough = (file: File): File => file;

export const compressFile = async (file: File): Promise<File> => {
  if (file.type.startsWith("image/")) {
    return compressImage(file);
  }

  if (file.type === "application/pdf") {
    return compressPdf(file);
  }

  return passThrough(file);
};
