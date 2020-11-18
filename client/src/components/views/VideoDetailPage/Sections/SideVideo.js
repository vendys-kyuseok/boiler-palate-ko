import React, {useEffect, useState} from 'react';
import axios from 'axios';

function SideVideo () {

    const [video, setVideo] = useState([]); 

    useEffect(() => {
        axios.get('/api/video/getvideos')
            .then(response => {
                if(response.data.success) {
                    console.log(response.data.videos)
                    setVideo(response.data.videos)
                } else {
                    alert(' 불러오기 실패 ')
                }
            })
    }, [])


    const reactSideVideo = video.map((video, index) => {
  
        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return <div key={index} style={{ display: 'flex', marginTop: '1rem', padding: '0 2rem' }}>
            <div style={{ width:'40%', marginRight:'1rem' }}>
                <a href={`/video/${video._id}`}  style={{ color:'gray' }}>
                    <img style={{width: '100%'}} src={`http://localhost:5000/${video.thumbnail}`} alt="test"></img>
                </a>
            </div>

            <div style={{width: '50%'}}>
                <a href={`/video/${video._id}`} style={{ color:'gray' }}>
                    <span style={{ fontSize: '1rem', color: 'black' }}>{video.title}</span><br />
                    <span>{video.writer.name}</span><br />
                    <span>{video.views}</span><br />
                    <span>{minutes} : {seconds}</span><br />
                </a>
            </div>
        </div>
    })

    return (
        <React.Fragment>
            <div style={{ marginTop:'3rem' }}></div>
            {reactSideVideo}
        </React.Fragment>
    )
}

export default SideVideo;

//const context = useContext(contextValue)