import { Dirs, FileSystem } from 'react-native-file-access';
import { unzip, zip } from 'react-native-zip-archive';
import { getIndexerFilePath, getSoundPath } from './custom';
import { Item } from '../types/Item';
import { Share } from 'react-native';
import { pick } from '@react-native-documents/picker';
import uuid from 'react-native-uuid';

const exportZipPath = `${Dirs.DocumentDir}/soundboard-export.zip`;

export class Exporter {
  generateZip(): Promise<void> {
    return FileSystem.readFile(getIndexerFilePath())
      .then(async (val) => {
        const items = JSON.parse(val).map((v: Item) => getSoundPath(v.name));

        const zipPath = await zip(
          [getIndexerFilePath(), ...items],
          exportZipPath
        );

        Share.share({
          title: 'Soundboard sounds export',
          message: 'Share your favorite sounds with anyone',
          url: 'file://' + zipPath
        }).finally(() => FileSystem.unlink(exportZipPath));
      })
      .catch(() => {
        FileSystem.writeFile(getIndexerFilePath(), '[]');
      });
  }

  async importZip(): Promise<boolean> {
    try {
      const [selectedFile] = await pick();

      const previousIndexMap: ReadonlyArray<Item> = JSON.parse(
        await FileSystem.readFile(getIndexerFilePath())
      );

      await unzip(selectedFile.uri.split('file://')[1], Dirs.DocumentDir);

      const newIndexMap: ReadonlyArray<Item> = JSON.parse(
        await FileSystem.readFile(getIndexerFilePath())
      );

      const { items } = [...previousIndexMap, ...newIndexMap].reduce<{
        founds: Record<string, boolean>;
        items: ReadonlyArray<Item>;
      }>(
        (acc, curr) => {
          const id = curr.id ?? uuid.v4().toString();
          if (!acc.founds[id]) {
            acc.items = [...acc.items, curr];
            acc.founds[id] = true;
          }

          return acc;
        },
        { founds: {}, items: [] }
      );

      console.log(items);

      await FileSystem.writeFile(getIndexerFilePath(), JSON.stringify(items));

      return true;
    } catch {
      return false;
    }
  }
}
