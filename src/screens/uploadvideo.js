import React, { useState } from 'react'
import { Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { createPath, uploadVideo } from '../actions/video'
import Dropzone from 'react-dropzone'
import * as Config from '../utils/config.json'
import '../styles/uploadvideo.scss'

//components
import Input from '../components/auth/input'
import Submit from '../components/auth/submit'
import Textarea from '../components/auth/textarea'
import WithNav from '../hoc/withNav';


const privacy = [{ value: 0, label: 'Public' }, { value: 1, label: 'Private' },];
const categories = [{ value: 1, label: 'Auto & Vehicles' },
{ value: 2, label: 'Sports' }, { value: 3, label: 'Music' }, { value: 4, label: 'Porn' }, { value: 5, label: 'Videography & Films' }];


const { Option } = Select;
const user = JSON.parse(localStorage.getItem('auth'))

export default function Uploadvideo(props) {
  const dispatch = useDispatch();
  const videopath = useSelector((state) => state.video.videopath);
  const generatedThumbnail = useSelector((state) => state.video.generatedThumbnail);
  const [payload, setPayload] = useState({ title: '', description: '', privacy: 1, category: 0 });
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
  // Sis is basically clearing the hideous moral life.Quotes: Moral high ground was created by a bitch who couldn't take the smoke once they gave it. The rest of the video solidifies that :)
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
    if (user && user.userId) {
      const { title, description, privacy, category } = payload;
      const { thumbnailsPath, duration } = generatedThumbnail;
      if (!title || !description || !category || privacy === '' || !thumbnailsPath || !duration || !videopath.filePath) {
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


  return (
    <WithNav>
      <div className="upload-video">
        <div className="title">Upload Video</div>
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
          {/* {file && file.name && <p className="file-name">Video uploaded: {file.name}</p>} */}
          {generatedThumbnail && generatedThumbnail.thumbnailsPath &&
            <div>
              <img src={`${Config.base}/${generatedThumbnail.thumbnailsPath}`} alt="" className="g-thumbnail" />
            </div>
          }
          <Input withIcon placeholder="Title" type="text" value={payload.title}
            onChange={e => handleChange("title", e.target.value)} />

          <Textarea placeholder="Description" rows="10" value={payload.description}
            onChange={e => handleChange("description", e.target.value)} />

          <span className="file-name">Privacy</span>
          <Select onChange={(v) => handleSelectChange('privacy', v)}>
            {privacy.map((el, i) => (
              <Option key={i} value={el.value}>{el.label}</Option>
            ))}
          </Select>
          <span className="file-name">Category</span>
          <Select onChange={(v) => handleSelectChange('category', v)}>
            {categories.map((el, i) => (
              <Option key={i} value={el.label}>{el.label}</Option>
            ))}
          </Select>
          <Submit label="Upload" handleClick={onSubmit} />
        </form>
      </div>
    </WithNav>
  )
}
