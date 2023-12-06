import { ReadDirItem } from 'react-native-fs';


export interface PDFFile {
  name: string;
  path: string;
}

export interface ReadDirItemExtended extends ReadDirItem {
  name: string;
  path: string;
}
