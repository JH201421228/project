import React, { useRef, useState } from 'react';
import { FaEnvelope, FaPhone, FaHome, FaClock, FaBirthdayCake, FaEdit } from 'react-icons/fa';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux'
import { getDownloadURL, getStorage, uploadBytesResumable, ref as strRef } from 'firebase/storage';
import { update, ref as dbRef } from 'firebase/database';
import { updateUserProfile } from '../../store/userProfileSlice';
import {db} from '../../firebase';
import axios from 'axios';
import getEnv from '../../utils/getEnv';

const StyledDinosaurSidePanel = styled.div`
background-color: rgb(255, 248, 223);
padding: 2rem;
color: white;
width: 350px;
border-radius: 20px 0 0 20px;
height: 100%;

@media (max-width: 768px) {
  max-width: 100%;
  border-radius: 0;
}
`;

const InnerContainer = styled.div`
  height: 40%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const CloseButton = styled.button`
position: absolute;
left: 96%;
top: 0;
border-radius: 25px;
border: none;
background-color: rgb(255, 248, 223);
font-weight: bold;
color: rgb(240, 165, 8);

@media (max-width: 768px) {
  left: 85%;
}
`;

const ProfileImage = styled.img`
  paddingright: 15px;
  height: 9rem;
  width: 9rem;
  border-radius: 100px;
  border: 4px solid rgb(45,45,45);
  padding: 2px;
  
  @media (max-width: 768px) {
    position: relative;
    left: 0;
    top: 0;
    margin: 20px auto;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  height: 60%;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    height: auto;
  }
`;

const NameHeader = styled.h4`
  font-weight: bolder;
  color: rgb(0, 0, 0);
`;

const DetailContainer = styled.div`
  margin-top: 15px;
  width: 100%;
  height: 100%;
  color: rgb(0, 0, 0);
  padding: 2rem;
  background-color: rgb(255, 255, 255);
  box-shadow: 2px 2px 1px rgb(240, 165, 8, 0.7);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-size:20px;
  position: relative;  
`;

const DetailParagraph = styled.p`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const StyledFaEdit = styled(FaEdit)`
  position: absolute;
  left: 67%;
  top: 69%;
  cursor: pointer;
  height: 30px;
  width: 30px
`

const ChildDinosaurSidePanel = () => {
  const [sidePanelStatus, setSidePanelStatus] = useState(true);
  const userInfo = useSelector((state) => state.user.value)
  const urlInfo = getEnv('API_URL');
  const ref = useRef(null)
  const dispatch = useDispatch()
  const handleOpenImage = () => {
    ref.current.click()
  }

  const handleUploadImage = (event) => {
    
    const file = event.target.files[0]
    const storage = getStorage();

    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: file.type
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = strRef(storage, 'user_image/' + userInfo.memberId);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, 
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log('File available at', downloadURL);

          dispatch(updateUserProfile(downloadURL))
          update(dbRef(db, `users/${userInfo.memberId}`), {image: downloadURL})

          const memberId = userInfo.memberId
          const profileImgPath = downloadURL

          try {
            const res = axios.put(`${urlInfo}/member/profile`, {memberId, profileImgPath})
            // console.log(res, '이미지 주소 백에 보내기')
            // console.log(downloadURL)
          }
          catch (err) {
            console.error(err)
          }

        });
      }
    );
  }

  const renderSidePanel = () => {
    if (sidePanelStatus) {
      return (
        <StyledDinosaurSidePanel>
          <InnerContainer>
            <div>
            <CloseButton onClick={() => setSidePanelStatus(false)}>{"<<"}</CloseButton>
            <ProfileImage src={userInfo.profileImgPath} alt="" />
            </div>
            <div onClick={handleOpenImage} style={{color: 'rgb(45,45,45)', fontSize: '16px', display:'flex', alignItems: 'flex-end', gap: '13px' }}> 
              <StyledFaEdit/> 
            </div>
            <input type="file" accept='image/jpeg, image/png' ref={ref} onChange={handleUploadImage} style={{display: 'none'}}/>
          </InnerContainer>
          <InfoContainer>
            <NameHeader>{userInfo.childName} 학생</NameHeader>
            <DetailContainer>
              <DetailParagraph><FaEnvelope style={{ marginRight: '10px' }} />{userInfo.email}</DetailParagraph>
              <DetailParagraph><FaPhone style={{ marginRight: '10px' }} />{userInfo.phoneNumber}</DetailParagraph>
              <DetailParagraph><FaHome style={{ marginRight: '10px' }} />{userInfo.centerName}</DetailParagraph>
              <DetailParagraph><FaBirthdayCake style={{ marginRight: '10px' }} />{userInfo.birth}</DetailParagraph>
              <DetailParagraph><FaClock style={{ marginRight: '10px' }} />{userInfo.enterDate}</DetailParagraph>
            </DetailContainer>
          </InfoContainer>
        </StyledDinosaurSidePanel>
      );
    } else {
      return (
        <button style={{height: '25px', borderRadius: '25px', backgroundColor: 'rgb(255, 248, 223)', fontWeight: 'bold', color: 'rgb(240, 165, 8)', margin: '2rem', border: 'none' }} onClick={() => setSidePanelStatus(true)}>{">>"}</button>
      );
    }
  };

  return (
    renderSidePanel()
  );
};

export default ChildDinosaurSidePanel;
