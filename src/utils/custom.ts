import { Dirs, FileSystem } from 'react-native-file-access';
import Sound from 'react-native-sound';
import { Item } from '../types/Item';

const blobToBase64 = (blob: Blob): Promise<string> => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
  });
};

const getIndexerFilePath = () => `${Dirs.DocumentDir}/indexer.json`;
const getSoundPath = (name: string) => `${Dirs.DocumentDir}/${name}.mp3`;

export class CustomSound {
  getSounds(): Promise<ReadonlyArray<Item>> {
    return FileSystem.readFile(getIndexerFilePath())
      .then(async (val) => {
        const values = await Promise.allSettled(
          (JSON.parse(val) as ReadonlyArray<Item>).map((v) => ({
            ...v,
            sound: new Sound(getSoundPath(v.name))
          }))
        );

        return values
          .map((v) => (v.status === 'fulfilled' ? { ...v.value } : undefined))
          .filter((v) => v !== undefined) as ReadonlyArray<Item>;
      })
      .catch(() => {
        FileSystem.writeFile(getIndexerFilePath(), '[]');
        return [];
      });
  }

  persist(name: string, image: string): Promise<void> {
    return FileSystem.readFile(getIndexerFilePath()).then(async (list) => {
      const items = JSON.parse(list);
      await FileSystem.writeFile(
        getIndexerFilePath(),
        JSON.stringify([...items, { name, image }])
      );
    });
  }

  download(url: string, name: string): Promise<boolean> {
    return fetch(url)
      .then(async (res) => {
        const resBlob = await res.blob();
        const value = await blobToBase64(resBlob);
        await FileSystem.writeFile(getSoundPath(name), value, 'base64');
      })
      .then(() => true)
      .catch(() => false);
  }

  reset(): Promise<void> {
    return FileSystem.ls(Dirs.DocumentDir)
      .then((files) => {
        files.map((f) => FileSystem.unlink(`${Dirs.DocumentDir}/${f}`));
      })
      .then(() => FileSystem.writeFile(getIndexerFilePath(), '[]'));
  }
}