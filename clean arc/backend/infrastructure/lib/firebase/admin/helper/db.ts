import "server-only";

import { db } from "../admin";
import { type ApiResponse } from "../../types";
import { logError, logInfo } from "@/utils/log";
import { type WhereFilterOp } from "firebase-admin/firestore";

/**
 * Adds a new document to a collection.
 * @param collectionName - The Firestore collection name.
 * @param data - The document data.
 * @returns {ApiResponse<string>} - Document ID or error message.
 */
export const addDocument = async <T extends object>(collectionName: string, data: T): Promise<ApiResponse<string>> => {
  try {
    const docRef = await db.collection(collectionName).add(data);
    logInfo("Document written with ID:", docRef.id);
    return { status: "success", result: docRef.id };
  } catch (error: unknown) {
    logError("Error adding document:", (error as Error).message);
    return {
      status: "error",
      result: null,
      errorMessage: (error as Error).message,
    };
  }
};

/**
 * Retrieves a document by its ID.
 * @param collectionName - The Firestore collection name.
 * @param docId - The document ID.
 * @returns {ApiResponse<T>} - Document data or error message.
 */
export const getDocumentById = async <T>(collectionName: string, docId: string): Promise<ApiResponse<T>> => {
  try {
    const docRef = db.collection(collectionName).doc(docId);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      logInfo("No such document!");
      return { status: "not_found", result: null };
    }

    const data = docSnap.data() as T;
    return { status: "success", result: data! };
  } catch (error: unknown) {
    logError("Error fetching document:", (error as Error).message);
    return {
      status: "error",
      result: null,
      errorMessage: (error as Error).message,
    };
  }
};

/**
 * Retrieves all documents from a collection.
 * @param collectionName - The Firestore collection name.
 * @returns {ApiResponse<(T & { id: string })[]>} - Array of documents or error message.
 */
export const getDocuments = async <T>(collectionName: string): Promise<ApiResponse<(T & { id: string })[]>> => {
  try {
    const querySnapshot = await db.collection(collectionName).get();
    const results = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as T),
    }));

    return { status: "success", result: results };
  } catch (error: unknown) {
    logError("Error fetching documents:", (error as Error).message);
    return {
      status: "error",
      result: null,
      errorMessage: (error as Error).message,
    };
  }
};

/**
 * Updates a document with new data.
 * @param collectionName - The Firestore collection name.
 * @param docId - The document ID.
 * @param newData - The new data to update.
 * @returns {ApiResponse<void>} - Success status or error message.
 */
export const updateDocument = async <T extends object>(collectionName: string, docId: string, newData: T): Promise<ApiResponse<void>> => {
  try {
    await db.collection(collectionName).doc(docId).update(newData);
    return { status: "success", result: null };
  } catch (error: unknown) {
    logError("Error updating document:", (error as Error).message);
    return {
      status: "error",
      result: null,
      errorMessage: (error as Error).message,
    };
  }
};

/**
 * Deletes a document from a collection.
 * @param collectionName - The Firestore collection name.
 * @param docId - The document ID.
 * @returns {ApiResponse<void>} - Success status or error message.
 */
export const deleteDocument = async (collectionName: string, docId: string): Promise<ApiResponse<void>> => {
  try {
    await db.collection(collectionName).doc(docId).delete();
    return { status: "success", result: null };
  } catch (error: unknown) {
    logError("Error deleting document:", (error as Error).message);
    return {
      status: "error",
      result: null,
      errorMessage: (error as Error).message,
    };
  }
};

/**
 * Retrieves documents that match a specific query.
 * @param collectionName - The Firestore collection name.
 * @param fieldName - The field to filter by.
 * @param operator - The Firestore comparison operator.
 * @param value - The value to compare against.
 * @returns {ApiResponse<(T & { id: string })[]>} - Array of matching documents or error message.
 */
export const getDocumentsByQuery = async <T>(
  collectionName: string,
  fieldName: string,
  operator: WhereFilterOp,
  value: string | number | boolean
): Promise<ApiResponse<(T & { id: string })[]>> => {
  try {
    const querySnapshot = await db.collection(collectionName).where(fieldName, operator, value).get();

    if (querySnapshot.empty) {
      logInfo("No matching documents.");
      return { status: "not_found", result: null };
    }

    const results = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as T),
    }));

    return { status: "success", result: results };
  } catch (error: unknown) {
    logError("Error querying documents:", (error as Error).message);
    return {
      status: "error",
      result: null,
      errorMessage: (error as Error).message,
    };
  }
};

/* getDocumentsByQuery example
const users = await getDocumentsByQuery('users', 'email', '==', 'john@example.com');

const users = await getDocumentsByQuery("users","age",">=",18);
*/
