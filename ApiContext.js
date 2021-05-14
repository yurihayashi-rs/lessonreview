import React,{createContext, useState, useEffect} from 'react'
import { withCookies } from "react-cookie";
import axios from 'axios'
import { ListItemAvatar } from '@material-ui/core';

export const ApiContext = createContext();

const ApiContextProvider = (props) => {

    const token = props.cookies.get("jwt-token");
    const [videos, setVideos] = useState([]);
    const [title, setTitle] = useState("");
    const [video, setVideo] = useState(null);
    const [thum, setThum] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [memo, setMemo] = useState("")
    const [editedVideoMemo, setEditedVideoMemo] = useState({id:"",memo:""})

    useEffect(() => {
        const getVideos = async () => {
          try {
            const res = await axios.get("http://localhost:8000/api/videos/", {
              headers: {
                Authorization: `JWT ${token}`,
              },
            });
            setVideos(res.data);
          } catch {
            console.log("error");
          }
        };
        getVideos();
    }, [token]);

    const newVideo = async () => {
        const uploadData = new FormData();
        uploadData.append("title", title);
        uploadData.append("video", video, video.name);
        uploadData.append("thum", thum, thum.name);
        uploadData.append("memo", memo, memo.name);
        try {
          const res = await axios.post("http://127.0.0.1:8000/api/videos/",uploadData,{
              headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${token}`,
              },});
            setVideos([...videos, res.data]);
            setModalIsOpen(false);
            setTitle("");
            setVideo(null);
            setThum(null);
            setMemo("")
            } 
        catch {
          console.log("error");
        }
    };

    const deleteVideo = async () => {
        try {
          await axios.delete(
            `http://127.0.0.1:8000/api/videos/${selectedVideo.id}/`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${token}`,
              },
            }
          );
          setSelectedVideo(null);
          setVideos(videos.filter((item) => item.id !== selectedVideo.id));
        } catch {
          console.log("error");
        }
    };

    const incrementRead = async () => {
        try {
          const uploadData = new FormData();
          uploadData.append("read", selectedVideo.read + 1);
    
          const res = await axios.patch(
            `http://127.0.0.1:8000/api/videos/${selectedVideo.id}/`,
            uploadData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${token}`,
              },
            }
          );
          setSelectedVideo({ ...selectedVideo, read: res.data.read });
          setVideos(
            videos.map((item) => (item.id === selectedVideo.id ? res.data : item))
          );
        } catch {
          console.log("error");
        }
      };

      const editVideoMemo = (item) => {

        axios.put(`http://127.0.0.1:8000/api/videos/${item.id}/`,item,{
            headers:{
                "Content-Type": "application/json",
                Authorization: `JWT ${token}`,
            }})
            .then(res => {setVideos(videos.map(item => (item.id === editedVideoMemo.id ? res.data : item)));
                setEditedVideoMemo({id:'', memo:''})
        })
    }

    const handleInputChange = () => evt => {
        const value = evt.target.value;
        const name = evt.target.name;
        setEditedVideoMemo({...editedVideoMemo, [name]:value})
    }




    return (
        <ApiContext.Provider
          value={{
            videos,
            title,
            setTitle,
            video,
            setVideo,
            thum,
            setThum,
            selectedVideo,
            setSelectedVideo,
            modalIsOpen,
            setModalIsOpen,
            memo,
            setMemo,
            editedVideoMemo, 
            setEditedVideoMemo,
            newVideo,
            deleteVideo,
            incrementRead,
            editVideoMemo,
            handleInputChange,
            }}
        >
            {props.children}
        </ApiContext.Provider>
    )
}

export default withCookies(ApiContextProvider)
