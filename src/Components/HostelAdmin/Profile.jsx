import React, { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';
import Avatar from 'react-avatar-edit';

function Profile() {
  const { setFieldValue } = useFormikContext();
  const [src, setSrc] = useState(null);
  const [preview, setPreview] = useState(null);
  console.log(preview);

  const onClose = () => {
    setPreview(null);
    setFieldValue('profileImage', null);
  };

  const onCrop = (view) => {
    setPreview(view);
    setFieldValue('profileImage', view);
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: mimeString });
    return blob;
  };

  useEffect(() => {
    if (preview) {
      const imageString = dataURItoBlob(preview).toString();
      console.log(imageString);
    }
  }, [preview]);

  return (
    <div>
      <Avatar width={200} height={230} onCrop={onCrop} onClose={onClose} src={src} />
    </div>
  );
}

export default Profile;
