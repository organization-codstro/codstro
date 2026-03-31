import imageCompression from "browser-image-compression";
import { PDFDocument } from "pdf-lib";

/** 이미지 압축 (browser-image-compression) */
const compressImage = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  const compressed = await imageCompression(file, options);
  return new File([compressed], file.name, { type: compressed.type });
};

/** PDF 압축 (pdf-lib — 구조 최적화, 브라우저 전용) */
const compressPdf = async (file: File): Promise<File> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, {
    ignoreEncryption: true,
  });
  const compressedBytes = await pdfDoc.save({ useObjectStreams: true });

  // Uint8Array → ArrayBuffer 명시 변환으로 BlobPart 타입 오류 해결
  const buffer = compressedBytes.buffer.slice(
    compressedBytes.byteOffset,
    compressedBytes.byteOffset + compressedBytes.byteLength,
  ) as ArrayBuffer;

  return new File([buffer], file.name, { type: "application/pdf" });
};

/** 기타 파일 — 압축 없이 그대로 반환 */
const passThrough = (file: File): File => file;

/** 파일 타입별 압축 분기 */
export const compressFile = async (file: File): Promise<File> => {
  if (file.type.startsWith("image/")) return compressImage(file);
  if (file.type === "application/pdf") return compressPdf(file);
  return passThrough(file); // zip, doc 등 기타
};
