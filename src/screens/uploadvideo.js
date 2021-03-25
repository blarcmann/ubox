import React, { useState } from 'react'
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createPath, uploadVideo } from '../actions/video';
import Dropzone from 'react-dropzone';
import * as Config from '../utils/config.json';
import '../styles/uploadvideo.scss';

//components
import Input from '../components/auth/input';
import Submit from '../components/auth/submit';
import Textarea from '../components/auth/textarea'
// import Message from '../components/auth/message';


const privacy = [{ value: 0, label: 'Private' }, { value: 1, label: 'Public' }];
const categories = [{ value: 0, label: 'Videography & Films' }, { value: 1, label: 'Auto & Vehicles' },
{ value: 2, label: 'Sports' }, { value: 3, label: 'Music' }, { value: 4, label: 'Porn' }];


const { Option } = Select;
const user = JSON.parse(localStorage.getItem('auth'))

export default function Uploadvideo(props) {
  const dispatch = useDispatch();
  const videopath = useSelector((state) => state.video.videopath);
  // const user = useSelector((state) => state.user.user);
  const generatedThumbnail = useSelector((state) => state.video.generatedThumbnail);
  const [payload, setPayload] = useState({ title: '', description: '', privacy: '', category: '' });
  const [file, setFile] = useState('');
  // const [uploadError, setUploadError] = useState({ status: false, msg: '' });


  const handleChange = (key, value) => {
    setPayload(payload => ({ ...payload, [key]: value }))
  }

  const handleSelectChange = (type, value) => {
    if (type === 'privacy') {
      setPayload(payload => ({ ...payload, privacy: value }))
    }
    if (type === 'category') {
      setPayload(payload => ({ ...payload, category: value }))
    }
  }

  const handleFile = (File) => {
    if (File) {
      setFile(File[0]);
      const formData = new FormData();
      formData.append('file', File[0]);
      dispatch(createPath(formData))
    } else {
      alert('file not selected')
    }
  }

  const onSubmit = () => {
    if (user && user.id) {
      const { title, description, privacy, category } = payload;
      const { thumbnailsPath, duration } = generatedThumbnail;
      if (!title || !description || !categories || !privacy || !thumbnailsPath || !duration || !videopath.filePath) {
        return alert('Please fill all the fields')
      }
      const data = {
        writer: user.userId,
        title: title,
        description: description,
        privacy: privacy,
        filePath: videopath.filePath,
        category: category,
        thumbnail: thumbnailsPath,
        duration: duration,
      }
      dispatch(uploadVideo(data, props))
    } else {
      alert('login to continue')
    }
  }

  console.log('videopath', videopath);


  return (
    <div className="upload-video">
      <div className="title">Upload Video</div>
      {/* {uploadError.status
        ? <Message>
          {uploadError.msg ? uploadError.msg : 'Some error Occured'}
        </Message>
        : ''} */}

      <form>
        <Dropzone
          multiple={false} maxSize={2e+8}
          accept="video/*"
          onDrop={acceptedFile => handleFile(acceptedFile)}>
          {({ getRootProps, getInputProps }) => (
            <div className="upload-file" {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          )}
        </Dropzone>
        {file && file.name && <p>Video uploaded: {file.name}</p>}
        {generatedThumbnail && generatedThumbnail.thumbnailsPath &&
          <div>
            <img src={`${Config.base}/${generatedThumbnail.thumbnailsPath}`} alt="" />
          </div>
        }
        <Input withIcon placeholder="Title" type="text" value={payload.title}
          onChange={e => handleChange("title", e.target.value)} />

        <Textarea placeholder="Description" rows="10" value={payload.description}
          onChange={e => handleChange("description", e.target.value)} />

        <Select defaultValue={0} style={{ width: 120 }} onChange={(v) => handleSelectChange('privacy', v)}>
          {privacy.map((el, i) => (
            <Option key={i} value={el.value}>{el.label}</Option>
          ))}
        </Select>

        <Select defaultValue={0} style={{ width: 120 }} onChange={(v) => handleSelectChange('category', v)}>
          {categories.map((el, i) => (
            <Option key={i} value={el.label}>{el.label}</Option>
          ))}
        </Select>
        <Submit label="Upload" handleClick={onSubmit} />
      </form>
    </div>
  )
}
