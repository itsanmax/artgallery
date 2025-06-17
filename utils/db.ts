import Dexie, { Table } from 'dexie';
import { Artwork } from '../types/artwork';


class ArtGalleryDB extends Dexie {
  artworks!: Table<Artwork, number>;

  constructor() {
    super('ArtGalleryDB');
    this.version(1).stores({
      artworks: '++id,title,description,image',
    });
  }
}

export const db = new ArtGalleryDB();
