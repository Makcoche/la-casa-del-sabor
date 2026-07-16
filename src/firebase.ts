import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  collection, 
  onSnapshot, 
  setDoc, 
  deleteDoc, 
  getDocs,
  writeBatch
} from 'firebase/firestore';
import { BrandInfo, Product } from './types';
import config from '../firebase-applet-config.json';

// Initialize Firebase App
const app = initializeApp(config);

// Initialize Firestore with the custom database ID from config
export const db = getFirestore(app, config.firestoreDatabaseId || "(default)");

/**
 * Subscribes to brand info changes in Firestore.
 * If the document does not exist, it seeds it with the provided default.
 */
export function subscribeToBrandInfo(
  defaultBrand: BrandInfo,
  onUpdate: (info: BrandInfo) => void
): () => void {
  const brandDocRef = doc(db, 'brand', 'info');

  return onSnapshot(brandDocRef, async (snapshot) => {
    if (snapshot.exists()) {
      onUpdate(snapshot.data() as BrandInfo);
    } else {
      // Seed default brand info
      try {
        await setDoc(brandDocRef, defaultBrand);
        onUpdate(defaultBrand);
      } catch (error) {
        console.error('Error seeding default brand info:', error);
        onUpdate(defaultBrand);
      }
    }
  }, (error) => {
    console.error('Error in brand info snapshot listener:', error);
    onUpdate(defaultBrand);
  });
}

/**
 * Subscribes to products changes in Firestore.
 * If the collection is empty, it seeds it with the provided default products list.
 */
export function subscribeToProducts(
  defaultProducts: Product[],
  onUpdate: (products: Product[]) => void
): () => void {
  const productsCollectionRef = collection(db, 'products');

  return onSnapshot(productsCollectionRef, async (snapshot) => {
    if (!snapshot.empty) {
      const productsList: Product[] = [];
      snapshot.forEach((docSnap) => {
        productsList.push(docSnap.data() as Product);
      });
      // Sort products by their ID or order to keep consistency
      productsList.sort((a, b) => a.id.localeCompare(b.id));
      onUpdate(productsList);
    } else {
      // Seed default products
      try {
        const batch = writeBatch(db);
        defaultProducts.forEach((product) => {
          const productDocRef = doc(db, 'products', product.id);
          batch.set(productDocRef, product);
        });
        await batch.commit();
        onUpdate(defaultProducts);
      } catch (error) {
        console.error('Error seeding default products:', error);
        onUpdate(defaultProducts);
      }
    }
  }, (error) => {
    console.error('Error in products collection snapshot listener:', error);
    onUpdate(defaultProducts);
  });
}

/**
 * Updates or sets the brand information in Firestore.
 */
export async function updateBrandInfoInDb(info: BrandInfo): Promise<void> {
  const brandDocRef = doc(db, 'brand', 'info');
  await setDoc(brandDocRef, info);
}

/**
 * Adds or updates a product in Firestore.
 */
export async function saveProductToDb(product: Product): Promise<void> {
  const productDocRef = doc(db, 'products', product.id);
  await setDoc(productDocRef, product);
}

/**
 * Deletes a product from Firestore.
 */
export async function deleteProductFromDb(id: string): Promise<void> {
  const productDocRef = doc(db, 'products', id);
  await deleteDoc(productDocRef);
}

/**
 * Restores defaults for both brand info and products in Firestore.
 */
export async function restoreDefaultsInDb(
  defaultBrand: BrandInfo,
  defaultProducts: Product[]
): Promise<void> {
  // Update brand info
  const brandDocRef = doc(db, 'brand', 'info');
  await setDoc(brandDocRef, defaultBrand);

  // Clear existing products first to avoid orphans
  const productsCollectionRef = collection(db, 'products');
  const querySnapshot = await getDocs(productsCollectionRef);
  
  const deleteBatch = writeBatch(db);
  querySnapshot.forEach((docSnap) => {
    deleteBatch.delete(docSnap.ref);
  });
  await deleteBatch.commit();

  // Seed default products
  const addBatch = writeBatch(db);
  defaultProducts.forEach((product) => {
    const productDocRef = doc(db, 'products', product.id);
    addBatch.set(productDocRef, product);
  });
  await addBatch.commit();
}
