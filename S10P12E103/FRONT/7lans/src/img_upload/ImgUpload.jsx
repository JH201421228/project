import React, { useRef } from "react";
import { getDownloadURL, getStorage, uploadBytesResumable, ref as strRef } from 'firebase/storage';
import { update, ref as dbRef } from 'firebase/database';
import { db } from '../firebase';
import { useDispatch, useSelector } from "react-redux";
import { nextImgNum } from "../store/imgNumSlice";

const ImgUpload = () => {
    const dispatch = useDispatch()
    const imgNum = useSelector((state) => state.imgNum.value)
    const ref = useRef(null);

    const handleOpenImage = () => {
        ref.current.click();
    }

    const handleUploadImage = (event) => {
        const files = event.target.files;
        const storage = getStorage();
    
        // Iterate over each selected file
        Array.from(files).forEach((file, index) => {
            dispatch(nextImgNum());
            // Create the file metadata
            const metadata = {
                contentType: file.type
            };
    
            // Upload file and metadata to the storage
            const storageRef = strRef(storage, 'meeting_image/' + imgNum + index);
            const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    
            // Listen for state changes, errors, and completion of the upload
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Track upload progress
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    // console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            // console.log('Upload is paused');
                            break;
                        case 'running':
                            // console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    // Handle errors
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;
                        case 'storage/unknown':
                            // Unknown error occurred
                            break;
                    }
                },
                () => {
                    // Upload completed successfully, get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        // console.log('File available at', downloadURL);
                        // downloadURL에 이미지 경로 들어옴
                        // Update database with the download URL
                        update(dbRef(db, `users/${imgNum}`), { image: downloadURL });
                    });
                }
            );
        });
    }

    return (
        <div>
            <button onClick={handleOpenImage}>이미지 업로드</button>
            <input type="file" accept='image/jpeg, image/png' ref={ref} onChange={handleUploadImage} style={{ display: 'none' }} multiple />
        </div>
    );
}

export default ImgUpload;
