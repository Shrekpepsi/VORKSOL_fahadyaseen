import React, { useState, useEffect } from 'react';
import { View, Button, Text, FlatList, PermissionsAndroid, Platform } from 'react-native';
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import Pdf from 'react-native-pdf';
import { PDFFile, ReadDirItemExtended } from './type'; // Adjust the path as necessary
import { NativeModules } from 'react-native';


const App = () => {
  const [pdfFiles, setPdfFiles] = useState<PDFFile[]>([]); // Use the PDFFile type
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  useEffect(() => {
    requestStoragePermission();
  }, []);

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 29) {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage Permission Granted.');
        listPDFsInternal();
        listPDFsFromMediaStore();
      } else {
        console.log('Storage permission denied');
      }
    }
  };

  const listPDFsInternal = async () => {
    try {
      const files: ReadDirItemExtended[] = await RNFS.readDir(RNFS.DocumentDirectoryPath);
      const pdfs = files.filter(file => file.name.endsWith('.pdf')).map(file => ({ name: file.name, path: file.path }));
      setPdfFiles(pdfs);
    } catch (e) {
      console.error(e);
    }
  };

  const pickPDFsExternal = async () => {
  try {
    const results = await DocumentPicker.pick({
      type: [DocumentPicker.types.pdf],
      allowMultiSelection: true,  // Enable multiple file selection
    });
    const pdfFiles = results.map(file => ({
      name: file.name || 'Unknown',  // Fallback to 'Unknown' if name is null
      path: file.uri
    }));
    setPdfFiles(pdfFiles);
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      console.log('User cancelled the picker');
    } else {
      console.error(err);
    }
  }
};

const listPDFsFromMediaStore = async () => {
  try {
      const pdfFiles = await NativeModules.PDFScanner.scanForPDFs();
      console.log(`Found PDFs: ${JSON.stringify(pdfFiles)}`);
      setPdfFiles(pdfFiles);
  } catch (e) {
      console.error('Error scanning for PDFs', e);
  }
};


  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Load PDFs from Internal Storage" onPress={listPDFsInternal} />
      <Button title="Pick PDF from External Storage" onPress={pickPDFsExternal} />
      <Button title="Scan PDFs from Device" onPress={listPDFsFromMediaStore} />
      <FlatList
        data={pdfFiles}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <Text style={{ margin: 10 }} onPress={() => setSelectedPdf(item.path)}>
            {item.name}
          </Text>
        )}
      />
      {selectedPdf && (
        <Pdf
          source={{ uri: selectedPdf }}
          style={{ flex: 1 }}
        />
      )}
    </View>
  );
};

export default App;
