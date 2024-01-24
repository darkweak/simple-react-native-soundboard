import { Dirs, FileSystem } from 'react-native-file-access';
import Sound from 'react-native-sound';
import { Item } from '../types/Item';
import uuid from 'react-native-uuid';
import { setShortcuts } from './shortcut';

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
export const getSoundPath = (name: string) => `${Dirs.DocumentDir}/${name}.mp3`;

export class CustomSound {
  getSounds(): Promise<ReadonlyArray<Item>> {
    return FileSystem.readFile(getIndexerFilePath())
      .then(async (val) => {
        const values = await Promise.allSettled(
          (JSON.parse(val) as ReadonlyArray<Item>).map((v) => ({
            ...v,
            id: v.id ?? uuid.v4().toString(),
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

  async persist(name: string, image: string, id: string): Promise<void> {
    const list = await FileSystem.readFile(getIndexerFilePath());
    const items = JSON.parse(list);
    await FileSystem.writeFile(
      getIndexerFilePath(),
      JSON.stringify([...items, { name, image, id }])
    );
  }

  async remove(name: string, image: string): Promise<boolean> {
    const list = JSON.parse(await FileSystem.readFile(getIndexerFilePath()));
    const contains = list.some((item: { name: string, image: string }) => item.name == name && item.image == image);

    await FileSystem.writeFile(
      getIndexerFilePath(),
      JSON.stringify(list.filter((item: { name: string, image: string }) => item.name !== name && item.image !== image))
    );

    await FileSystem.unlink(getSoundPath(name));

    return contains;
  }

  download(url: string, name: string): Promise<boolean> {
    return fetch(url)
      .then(async (res) => {
        if (res.headers.get('content-type') !== 'audio/mpeg') {
          return await res.text().then((str) => {
            const match = str.match(/"(http(.+).mp3)"/);
            if (!match) {
              throw new Error();
            }
            return this.download(match[1], name);
          });
        }

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
