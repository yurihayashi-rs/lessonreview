import React, { useContext, useRef } from 'react'
import { ApiContext } from "../context/ApiContext";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import ReactPlayer from "react-player";

import { ImEyePlus } from "react-icons/im"
import { FaVideo } from "react-icons/fa"
import { VideocamSharp } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    title: {
      paddingLeft: theme.spacing(2),
    },
    delete: {
      margin: theme.spacing(2),
    },
    read: {
      paddingTop: theme.spacing(3),
    },
}));

const VideoDetail = () => {
    
    const classes = useStyles();
    const player = useRef(null);
    const {
        selectedVideo,
        deleteVideo,
        incrementRead,
        handleInputChange,
        editedVideoMemo, 
        setEditedVideoMemo,
        editVideoMemo,
        videos,

    } = useContext(ApiContext);


    if (!selectedVideo)
    return (
      <div className="container">
        <button className="wait">
          <FaVideo />
        </button>
      </div>
    );


    return (
        <div>
            <div className="wrapper">
                <ReactPlayer
                className="player"
                url={selectedVideo.video}
                ref={player}
                width="100%"
                height="100%"
                playing
                controls
                disablePictureInPicture
                config={{
                    file: {
                        attributes: {
                            controlsList: "nodownload",
                            disablePictureInPicture: true,
                        },
                    },
                }}
                />
            </div>
            <Grid container alignItems="center">
                    <Grid item xs={10}>
                    <Typography className={classes.title} variant="h6">
                        {selectedVideo.title}
                    </Typography>
                    </Grid>

                    <Grid item xs={1}>
                    <button className="read" onClick={() => incrementRead()}>
                        <ImEyePlus />
                        <Typography>{selectedVideo.read}</Typography>
                    </button>
                    </Grid>

            </Grid>
            <Fab
                className={classes.delete}
                color="primary"
                aria-label="delete"
                onClick={() => deleteVideo()}
            >
                <DeleteIcon />
            </Fab> 

            <Grid container alignItems="center">
                <Grid item xs={12}>
                    <Typography className={classes.title} variant="h6">
                    <p>{selectedVideo.memo}</p>
                        
                        <button className='edit-btn' onClick={()=>setEditedVideoMemo(selectedVideo)}>
                        <i className='fas fa-pen'></i>
                    </button>

                    <input className="edit-bar" type="text" name='memo'
                    value = {editedVideoMemo.memo}
                    onChange ={handleInputChange()}
                    placeholder="edit" required/>
                    <button className="edit-button" onClick={()=>editVideoMemo(editedVideoMemo)}>編集</button>

                    
                    
                            
                    </Typography>
                </Grid>

            </Grid>

      

      
            
        </div>
    )
}

export default VideoDetail
