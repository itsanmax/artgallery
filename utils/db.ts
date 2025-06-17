import Dexie, { Table } from 'dexie';

export interface Artwork {
  id: number;
  title: string;
  description: string;
  image: string;
}

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
