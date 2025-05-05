import "server-only";
import admin from "firebase-admin";
import { v4 } from "uuid";
import { logError } from "@/utils/log";
import { ApiResponse } from "../../types";
import { storage } from "../admin";

//TODO: Update Required

/**
 * Uploads a file (provided as a Buffer) to Firebase Storage at a destination path,
 * and then generates a signed URL for read access.
 *
 * @param fileBuffer - The Buffer containing the file data.
 * @param filePath - Optional base path/name for the file; if not provided, a default is used.
 * @returns A promise resolving to an ApiResponse containing the download URL and file path in storage.
 */
export const uploadFile = async (
  fileBuffer: Buffer,
  filePath?: string
): Promise<ApiResponse<{ downloadURL: string; filePathInStorage: string }>> => {
  if (!fileBuffer) {
    return {
      status: "error",
      result: null,
      errorMessage: "No file provided",
    };
  }
  try {
    // If no filePath is provided, default to 'file'
    if (!filePath) filePath = "file";
    // Append a unique identifier to avoid name collisions
    const generatedPath = filePath + "_" + v4();
    // Get a reference to the file in the storage bucket
    const fileRef = storage.file(generatedPath);
    // Upload the file buffer
    await fileRef.save(fileBuffer);
    // Generate a signed URL valid for a long duration (adjust expiration as needed)
    const [downloadURL] = await fileRef.getSignedUrl({
      action: "read",
      expires: "03-09-2491", // Example expiration date; adjust as needed
    });
    return {
      status: "success",
      result: { downloadURL, filePathInStorage: generatedPath },
    };
  } catch (error: unknown) {
    logError("Error uploading file:", error);
    return {
      status: "error",
      result: null,
      errorMessage: (error as Error).message,
    };
  }
};

/**
 * Retrieves a signed download URL for a file stored at the given path.
 *
 * @param filePath - The storage path of the file.
 * @returns A promise resolving to an ApiResponse containing the signed URL.
 */
export const getFileURL = async (
  filePath: string
): Promise<ApiResponse<string>> => {
  try {
    const fileRef = admin.storage().bucket().file(filePath);
    const [url] = await fileRef.getSignedUrl({
      action: "read",
      expires: "03-09-2491",
    });
    return { status: "success", result: url };
  } catch (error: unknown) {
    logError("Error getting file URL:", error);
    return {
      status: "error",
      result: null,
      errorMessage: (error as Error).message,
    };
  }
};

/**
 * Deletes a file from Firebase Storage at the specified path.
 *
 * @param filePath - The storage path of the file to delete.
 * @returns A promise resolving to an ApiResponse with a null result on success.
 */
export const deleteFile = async (
  filePath: string
): Promise<ApiResponse<null>> => {
  try {
    const fileRef = admin.storage().bucket().file(filePath);
    await fileRef.delete();
    return { status: "success", result: null };
  } catch (error: unknown) {
    logError("Error deleting file:", error);
    return {
      status: "error",
      result: null,
      errorMessage: (error as Error).message,
    };
  }
};

/**
 * Lists all file names (paths) in the specified folder (using a prefix).
 *
 * @param folderPath - The folder path or prefix to search within.
 * @returns A promise resolving to an ApiResponse containing an array of file paths.
 */
export const listFilesInFolder = async (
  folderPath: string
): Promise<ApiResponse<string[]>> => {
  try {
    const bucket = admin.storage().bucket();
    const [files] = await bucket.getFiles({ prefix: folderPath });
    const paths = files.map((file) => file.name);
    return { status: "success", result: paths };
  } catch (error: unknown) {
    logError("Error listing files:", error);
    return {
      status: "error",
      result: null,
      errorMessage: (error as Error).message,
    };
  }
};

/**
 * Lists all files in a folder along with their signed download URLs.
 *
 * @param folderPath - The folder path or prefix to list files from.
 * @returns A promise resolving to an ApiResponse containing an array of objects with file paths and their signed URLs.
 */
export const listFilesInFolderWithUrls = async (
  folderPath: string
): Promise<ApiResponse<{ filePath: string; url: string }[]>> => {
  try {
    const bucket = admin.storage().bucket();
    const [files] = await bucket.getFiles({ prefix: folderPath });
    const filesWithUrls = await Promise.all(
      files.map(async (file) => {
        const [url] = await file.getSignedUrl({
          action: "read",
          expires: "03-09-2491",
        });
        return { filePath: file.name, url };
      })
    );
    return { status: "success", result: filesWithUrls };
  } catch (error: unknown) {
    logError("Error listing files with URLs:", error);
    return {
      status: "error",
      result: null,
      errorMessage: (error as Error).message,
    };
  }
};

/**
 * Uploads a file (provided as a Buffer) along with metadata to Firebase Storage,
 * and returns a signed URL for the uploaded file.
 *
 * @param filePath - The storage path where the file should be saved.
 * @param file - The Buffer containing the file data.
 * @param metadata - An object containing metadata to associate with the file.
 * @returns A promise resolving to an ApiResponse containing the signed download URL.
 */
export const uploadFileWithMetadata = async (
  filePath: string,
  file: Buffer,
  metadata: object
): Promise<ApiResponse<string>> => {
  try {
    const bucket = admin.storage().bucket();
    const fileRef = bucket.file(filePath);
    await fileRef.save(file, { metadata });
    const [downloadURL] = await fileRef.getSignedUrl({
      action: "read",
      expires: "03-09-2491",
    });
    return { status: "success", result: downloadURL };
  } catch (error: unknown) {
    logError("Error uploading file with metadata:", error);
    return {
      status: "error",
      result: null,
      errorMessage: (error as Error).message,
    };
  }
};
