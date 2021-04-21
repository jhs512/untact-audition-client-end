import { ref, onMounted, watch } from 'vue';
import { Plugins, CameraResultType, CameraSource, CameraPhoto, Capacitor, FilesystemDirectory } from "@capacitor/core";
import { isPlatform } from '@ionic/vue';

export function usePhotoGallery() {
    const { Camera, Filesystem, Storage } = Plugins;
    const photos = ref<Photo[]>([]);
    const PHOTO_STORAGE = "photos";

    const convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
        const reader = new FileReader;
        reader.onerror = reject;
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
      });

    const savePicture = async (photo: CameraPhoto, fileName: string): Promise<Photo> => {
        let base64Data: string;
        const response = await fetch(photo.webPath!);
        const blob = await response.blob();
        
        const file = new File([blob], fileName, { lastModified: new Date().getTime(), type: blob.type })

        // "hybrid" will detect Cordova or Capacitor;
        if (isPlatform('hybrid')) {
          const file = await Filesystem.readFile({
            path: photo.path!
          });
          base64Data = file.data;
        } else {
            // Fetch the photo, read as a blob, then convert to base64 format
            const response = await fetch(photo.webPath!);
            const blob = await response.blob();
            base64Data = await convertBlobToBase64(blob) as string;
        }
        const savedFile = await Filesystem.writeFile({
          path: fileName,
          data: base64Data,
          directory: FilesystemDirectory.Data
        });

        if (isPlatform('hybrid')) {
          // Display the new image by rewriting the 'file://' path to HTTP
          // Details: https://ionicframework.com/docs/building/webview#file-protocol
          return {
            filepath: savedFile.uri,
            webviewPath: Capacitor.convertFileSrc(savedFile.uri),
            file
          };
        }
        else {
          // Use webPath to display the new image instead of base64 since it's 
          // already loaded into memory
          return {
            filepath: fileName,
            webviewPath: photo.webPath,
            blob,
            file
          };
        }
      };

    const takePhoto = async () => {
        const cameraPhoto = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100,
            webUseInput: true,
            saveToGallery: true
        });

        const fileName = new Date().getTime() + '.jpeg';
        const savedFileImage = await savePicture(cameraPhoto, fileName);
        
        photos.value = [savedFileImage, ...photos.value];
    };

    const deletePhoto = async (photo: Photo) => {
      // Remove this photo from the Photos reference data array
      photos.value = photos.value.filter(p => p.filepath !== photo.filepath);
  
      // delete photo file from filesystem
      const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
      await Filesystem.deleteFile({
        path: filename,
        directory: FilesystemDirectory.Data
      });
    };

    return {
        photos,
        takePhoto,
        deletePhoto
    }
}

export interface Photo {
  filepath: string;
  webviewPath?: string;
  blob?: Blob;
  file:File
}
