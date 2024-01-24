import React, { SetStateAction, useState } from 'react';
import { Button, Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { Input } from '../../components/form/input';
import { CustomSound } from '../../utils/custom';
import { useRescanCustomSounds } from '../../context/sound';
import { displayErrorAlert, displaySuccessAlert } from '../../utils/alert';
import uuid from 'react-native-uuid';

type fieldsType = {
    url?: string;
    name?: string;
    image?: string;
}

const displayDownloadAlert = (type: 'success' | 'fail', name: string, setFields?: React.Dispatch<SetStateAction<fieldsType | undefined>>) => {
  if (type === 'success') {
    displaySuccessAlert('MP3 downloaded', `Your MP3 ${name} has been downloaded successfully.`, [
      {text: 'OK', onPress: () => setFields?.(undefined)},
    ]);
  } else {
    displayErrorAlert('Error', `An error ocurred while downloading ${name}.`);
  }
};

const AddSound = () => {
  const tailwind = useTailwind();
  const rescan = useRescanCustomSounds();
  const [fields, setFields] = useState<fieldsType>();

  const onSubmit = () => {
    if (!/^(\p{Emoji})/u.test(fields?.image ?? '')) {
      displayErrorAlert('Invalid emoji', 'Your emoji is not an unique emoji');
      return;
    }
    if (fields?.url && fields?.name) {
      const cs = new CustomSound();
      cs.download(fields.url, fields.name).then(r => {
        if (r) {
          cs.persist(fields.name ?? 'default_name', fields.image ?? '🌝', uuid.v4().toString()).then(rescan);
          displayDownloadAlert('success', fields?.name ?? '', setFields);
        } else {
          displayDownloadAlert('fail', fields?.name ?? '');
        }
      }).catch(() => {
        displayDownloadAlert('fail', fields?.name ?? '');
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={tailwind('px-4 h-full')}>
        <View style={{ paddingVertical: 8 }}>
          <Input style={tailwind('my-2')} placeholder='URL to the mp3 file' autoCapitalize='none' setValue={(url) => setFields({ ...fields, url })} value={fields?.url ?? ''} keyboardType='url'/>
          <Input style={tailwind('my-2')} placeholder='Name' autoCapitalize='none' setValue={(name) => setFields({ ...fields, name })} value={fields?.name ?? ''} keyboardType='ascii-capable' />
          <Input style={tailwind('my-2')} placeholder='Emoji' autoCapitalize='none' setValue={(image) => setFields({ ...fields, image })} value={fields?.image ?? ''} maxLength={4} />
        </View>
        <View style={tailwind('flex items-center justify-center')}>
          <Button disabled={!fields?.image || !fields?.url || !fields?.name} onPress={onSubmit} title='Add the sound to your list' />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddSound;
