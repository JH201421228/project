import React, {useEffect, useState} from 'react';
import html2canvas from 'html2canvas';
import Modal from 'react-modal';
import {getDownloadURL, getStorage, uploadBytesResumable, ref as strRef} from 'firebase/storage';
import {update, ref as dbRef} from 'firebase/database';
import {useDispatch, useSelector} from "react-redux";
import {TbCaptureFilled} from "react-icons/tb";
import styled from 'styled-components';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from "prop-types";
import {Session} from "openvidu-browser";
import {useParams} from "react-router-dom";
import {db} from '../firebase';
import {nextImgNum} from "../store/imgNumSlice";

function ToastContent({url, message}) {
  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <img
        src={url}
        alt="thumbnail"
        style={{width: '50px', height: '50px', marginRight: '10px'}}
      />
      <p>{message}</p>
    </div>
  );
}


// 모달 스타일 컴포넌트
const StyledModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.9);
  border: 3px solid  rgb(255, 184, 36);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 50%;
`;

// 모달 속 버튼 스타일 컴포넌트
const ModalButton = styled.button`
  width: 140px;
  height: 70px;
  align-self: center;
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
  border-radius: 20px;
  background-color: rgba(255, 184, 36, 1);
  margin: 0 3rem 0 0;
  &:hover,
  &:focus {
    background-color: #4caf50; // 마우스를 올렸을 때 배경 색 변경
    color: #ffffff; // 마우스를 올렸을 때 글자 색 변경
  }
`;

const StyledButton = styled.button`
  width: 100px;
  height: 54px;
  align-self: center;
  font-weight: bolder;
  font-size: 20px;
  border: 2px dashed rgb(45, 45, 45);
  border-radius: 20px;
  background: rgba(255, 184, 36, 1);
  margin: 0 3rem 0 0;
`;

const ImgCaptureBtn = ({
                         setCapturedImages,
                         session,
                       }) => {

  const userInfo = useSelector((state) => state.user.value);
  const {meetingId} = useParams();

  const imgNum = useSelector((state) => state.imgNum.value)
  const dispatch = useDispatch();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [capturedData, setCapturedData] = useState('');
  const [captureModalOpen, setCaptureModalOpen] = useState(false);


  const openCaptureModal = () => {
    setCaptureModalOpen(true);
  };
  const closeCaptureModal = () => {
    setCaptureModalOpen(false);
  };



  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCapturedData('');  // 모달을 닫을 때 캡쳐 이미지 데이터를 초기화
  };


  const addImageSignal = (imageUrl) => {
    session.signal({
      type:'addImage',
      data: JSON.stringify({ imageUrl })
    })
      .then(() => {console.log('캡쳐 이미지 저장 시그널')})
      .catch((err) => {console.log(err)})
  }

  const receviceAddImageSignal = (event) => {
    const {imageUrl} = JSON.parse(event.data);
    setCapturedImages(prevImages => [...prevImages, imageUrl]);  // URL 추가
    toast(<ToastContent url={imageUrl} message="📷 사진이 저장되었습니다." />, {
      position : "bottom-right"
    })
  }


  useEffect(() => {
    if (session) {
      session.on('signal:addImage', receviceAddImageSignal);
    }
    return () => {
      if (session) {
        session.off('signal:addImage', receviceAddImageSignal);
      }
    }
  }, [session]);



  const handleUploadImage = async (imgData) => {
    dispatch(nextImgNum());

    // Create the file metadata
    const metadata = {
      contentType: 'image/png'
    };

    const storage = getStorage();
    const storageRef = strRef(storage, `meeting_image/${meetingId}/${userInfo.memberId}/${imgNum}`);
    const imageFile = dataURLtoFile(imgData, 'capture.png');
    const uploadTask = uploadBytesResumable(storageRef, imageFile, metadata);

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

          addImageSignal(downloadURL)
          // Update database with the download URL
          update(dbRef(db, `users/${meetingId}/${userInfo.memberId}/${imgNum}`), {image: downloadURL});
        });
      }
    );
  };

  async function captureScreen() {
    const videoElement1 = document.querySelector('#my-video');
    const videoElement2 = document.querySelector('#partner-video');

    if (videoElement1 && videoElement2) {

      const canvas1 = await html2canvas(videoElement1);
      const canvas2 = await html2canvas(videoElement2);

      let context = document.createElement('canvas').getContext('2d');

      context.canvas.width = canvas1.width + canvas2.width;
      context.canvas.height = Math.max(canvas1.height, canvas2.height);

      context.drawImage(canvas1, 0, 0);
      context.drawImage(canvas2, canvas1.width, 0);

      const data = context.canvas.toDataURL();
      setCapturedData(data);  // 캡쳐한 이미지 데이터 저장
      openModal();  // 저장 후 모달 열기
    } else {
      console.log('Element with id "my-video" or "partner-video" not found.');
    }
  }

  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
  }


  const handleTogetherCapture = async () => {
    const videoElement1 = document.querySelector('#my-video');
    const videoElement2 = document.querySelector('#partner-video');

    if (videoElement1 && videoElement2) {

      const canvas1 = await html2canvas(videoElement1);
      const canvas2 = await html2canvas(videoElement2);

      let context = document.createElement('canvas').getContext('2d');

      context.canvas.width = canvas1.width + canvas2.width;
      context.canvas.height = Math.max(canvas1.height, canvas2.height);

      context.drawImage(canvas1, 0, 0);
      context.drawImage(canvas2, canvas1.width, 0);

      const data = context.canvas.toDataURL();
      setCapturedData(data);  // 캡쳐한 이미지 데이터 저장
      handleUploadImage(data);
    }

    closeCaptureModal();
  };

  const handleSoloCapture = async () => {
    const videoElement = document.querySelector('#my-video');

    if (videoElement) {
      const canvas = await html2canvas(videoElement);

      let context = document.createElement('canvas').getContext('2d');

      context.canvas.width = canvas.width;
      context.canvas.height = canvas.height;

      context.drawImage(canvas, 0, 0);

      const data = context.canvas.toDataURL();
      setCapturedData(data);  // 캡쳐한 이미지 데이터 저장
      handleUploadImage(data);
    }

    closeCaptureModal();
  };

  const handleFullCapture = () => {
    closeCaptureModal();

    setTimeout(async () => {
      const bodyElement = document.body;

      if (bodyElement) {
        const canvas = await html2canvas(bodyElement);

        let context = document.createElement('canvas').getContext('2d');

        context.canvas.width = canvas.width;
        context.canvas.height = canvas.height;

        context.drawImage(canvas, 0, 0);

        const data = context.canvas.toDataURL();
        setCapturedData(data);  // 캡쳐한 이미지 데이터 저장
        handleUploadImage(data);
      }
    }, 500);  // Modal이 완전히 닫히길 기다립니다. 필요하다면 시간을 조정하세요.
    closeCaptureModal();
  };


  return (
    <div>
      <StyledButton onClick={openCaptureModal}> 캡쳐 <TbCaptureFilled/></StyledButton>
      <ToastContainer
        style={{ zIndex: 9999 }}
      />


      {/* <StyledModal isOpen={modalIsOpen} onRequestClose={closeModal}> */}
      {/*   <img src={capturedData} alt="Captured content" /> */}
      {/*   <StyledButton onClick={handleConfirm}>Confirm</StyledButton> */}
      {/*   <StyledButton onClick={closeModal}>Cancel</StyledButton> */}
      {/* </StyledModal> */}
      <StyledModal isOpen={captureModalOpen} onRequestClose={closeCaptureModal}>
        <ModalButton onClick={handleTogetherCapture}>함께 찍기</ModalButton>
        <ModalButton onClick={handleSoloCapture}>혼자 찍기</ModalButton>
        <ModalButton onClick={handleFullCapture}>전체 화면 찍기</ModalButton>
      </StyledModal>
    </div>
  );
};


ImgCaptureBtn.propTypes = {
  setCapturedImages: PropTypes.func.isRequired,
  session: PropTypes.instanceOf(Session).isRequired, // session이 Session의 인스턴스인지 확인
};

export default ImgCaptureBtn;