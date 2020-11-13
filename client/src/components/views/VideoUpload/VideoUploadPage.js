import React, {useState} from 'react';
import {Typography, Button, Form, message, Input, Icon} from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useSelector } from "react-redux";

const { TextArea } = Input;  
const { Title } = Typography;

const PrivateOpiton = [
    { value: 0, label: 'Private' },
    { value: 1, label: 'Public' }
]

const CategoryOpiton = [
    { value: 0, label: "Film & Animation" },
    { value: 0, label: "Autos & Vehicles" },
    { value: 0, label: "Music" },
    { value: 0, label: "Pets & Animals" },
    { value: 0, label: "Sports" },
]

const onSumbit = (e) => {

}

const onDrop = () => {

}

function VideoUploadPage() {

    const [VideoTitle, setVideoTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("Film & Animation")

    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value)
    }// 입력 가능

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value)
    }// 입력 가능

    const onPrivateChange = (event) => {
        setPrivate(event.currentTarget.value)
    }// 변경 가능

    const onCategoryChange = (event) => {
        setCategory(event.currentTarget.value)
    }// 변경 가능


    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        console.log(files)
        formData.append("file", files[0])

        axios.post('/api/video/uploadfiles', formData, config)
        .then(response => {
            if (response.data.success) {

                let variable = {
                    filePath: response.data.filePath,
                    fileName: response.data.fileName
                }
                setFilePath(response.data.filePath)

                axios.post('/api/video/thumbnail', variable)
                    .then(response => {
                        if (response.data.success) {
                            setDuration(response.data.fileDuration)
                            setThumbnail(response.data.thumbsFilePath)
                        } else {
                            alert('Failed to make the thumbnails');
                        }
                    })


            } else {
                alert('실패')
            }
        })

    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem'}}>
                <Title level={2} > Upload Video</Title>
            </div>
            
            <Form onSumbit={onSumbit}>
                <div style={{display: 'flex', justifyContent:'space-between'}}>


                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={800000000}>

                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                {...getRootProps()}>

                                <input {...getInputProps()} />
                                {/* <Icon type="plus" style={{ fontSize: '3rem' }} /> */}
                            </div>
                        )}
                    </Dropzone>


                    <div>
                        <img src="" />
                    </div>
                </div>

                <br /><br />

                <label>Title</label>
                <br />
                <Input
                    onChange={onTitleChange}
                    value={VideoTitle}
                />

                <br /><br />

                <label>Description</label>
                <br />
                <TextArea 
                    onChange={onDescriptionChange}
                    value={Description}
                />

                <br /><br />

                <select onChange={onPrivateChange}>
                    {PrivateOpiton.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>

                <br /><br />

                <select onChange={onCategoryChange}>
                    {CategoryOpiton.map((item, index) => (
                        <option key={index} value={item.label}>{item.label}</option>
                    ))}
                </select>

                <br /><br />

                <Button type="primary" size="large" onClick>
                    onSumbit
                </Button>

            </Form>

        </div>
    ) 
}

export default VideoUploadPage;