// prettier-ignore
import React from "react";
import ReactModal from "react-modal";
import "../scss/main.scss";
import { Outlet, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import EntryPage from "./pages/EntryPage";
import DinosaurDictPage from "./pages/DinosaurDictPage";

import VolunteerCalendar from "./components/volunteer/calendar/VolunteerCalendar";
import VolunteerMainPage from "./pages/volunteer_pages/VolunteerMainPage";
import StartPage from "./pages/volunteer_pages/StartPage";
import ActiveDoc from "./pages/volunteer_pages/ActiveDoc";
import WhisperPage from "./pages/volunteer_pages/WhisperPage";
import WhisperLetter from "./components/volunteer/whisper/WhisperLetter";
import RaiseEggPage from "./pages/volunteer_pages/RaiseEggPage";
import VideoChattingStartPage from "./pages/volunteer_pages/VideoChattingStartPage";
import ChoosePicturePage from "./pages/volunteer_pages/ChoosePicturePage";

import ChildMainPage from "./pages/child_pages/ChildMainPage";
import ChildStartPage from "./pages/child_pages/ChildStartPage";
import ChildVideoChattingStartPage from "./pages/child_pages/ChildVideoChattingStartPage";
import ChildWhisperPage from "./pages/child_pages/ChildWhisperPage";
import ChildRaiseEggPage from "./pages/child_pages/ChildRaiseEggPage";
import ChildDinosaurDictPage from "./pages/ChildDinosaurDictPage";
import ChildChoosePicturePage from "./pages/child_pages/ChildChoosePicturePage"
import ChildVideoChattingPage from "./pages/child_pages/VideoChattingPage.jsx"

import NormalNav from "./components/navs/NormalNav";


import VolunteerVideoChattingPage from "./pages/volunteer_pages/VideoChattingPage";
// import VolunteerGamePage from "./pages/volunteer_pages/VolunteerGamePage";
// import ChildVideoChattingPage from "./pages/child_pages/ChildVideoChattingPage";
// import ChildGamePage from "./pages/child_pages/ChildGamePage";
import Register from "./pages/RegisterPage";

import ActivityCalendar from "./components/volunteer/calendar/ActivityCalendar";
import ActiveDocs from "./components/volunteer/active_docs/AcitveDocs";
// 관리자
import AdminMainPage from "./pages/admin_pages/AdminMainPage";
import VolunteerManage from "./components/admin/VolunteerManage";
import ChildManage from "./components/admin/ChildManage";
import ActiveManage from "./components/admin/ActiveManage";

// import app from "./firebase";
import Waiting from "./components/volunteer/games/Waitng";

// jwt
import setAuthorizationToken from "./utils/setAuthorizationToken";


ReactModal.setAppElement('#root');


const NormalLayout = () => {
  return (
    <>
      <NormalNav />
      <CommonSidePanel />
      <main>
        <Outlet />
      </main>
    </>
  );
};

setAuthorizationToken(localStorage.jwtToken);

// prettier-ignore
function App() {
  return (
    <>
      <Routes>
        {/* 메인 및 공통 */}
        <Route path="/" element={<EntryPage />} />
        {/* <Route path="/" element={<NormalLayout />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />

        {/* 봉사자 */}
        <Route path="/volunteer_start" element={<StartPage />} />
        <Route path="/volunteer_main" element={<VolunteerMainPage />} />
        <Route path="/whisper_page" element={<WhisperPage />} />
        <Route path="/whisper_letter" element={<WhisperLetter />} />
        <Route path="/volunteer_video_chatting_start" element={<VideoChattingStartPage />}/>
        <Route path="/volunteer_active_doc" element={<ActiveDoc />} />
        <Route path="/activity_calendar" element={<ActivityCalendar />} />
        <Route path="/volunteer_whispher" element={<WhisperPage />} />
        <Route path="/volunteer_raise_egg" element={<RaiseEggPage />} />
        <Route path="/volunteer_video_chatting/:meetingId" element={<VolunteerVideoChattingPage />}/>
        {/* <Route path="/volunteer_game" element={<VolunteerGamePage />} /> */}
        <Route path="/volunteer_calendar" element={<VolunteerCalendar />} />
        <Route path="/volunteer_ChoosePicturePage" element={<ChoosePicturePage />} />
        <Route path="/dinosaur_dict" element={<DinosaurDictPage />} />
        <Route path="/active_docs" element={<ActiveDocs />} />

        {/* 피봉사자 */}
        <Route path="/child_main" element={<ChildMainPage />} />
        <Route path="/child_dinosaur_dict" element={<ChildDinosaurDictPage />}/>
        <Route path="/child_start" element={<ChildStartPage />} />
        <Route path="/child_video_chatting_start" element={<ChildVideoChattingStartPage />}/>
        <Route path="/child_whispher" element={<ChildWhisperPage />} />
        <Route path="/child_raise_egg" element={<ChildRaiseEggPage />} />
        <Route path="/child_video_chatting/:meetingId"element={<ChildVideoChattingPage />}/>
        {/* <Route path="/child_game" element={<ChildGamePage />} /> */}
        <Route path="/child_choose_picturePage" element={<ChildChoosePicturePage />} />

        {/* 관리자 */}
        <Route path="/admin_main_page" element={<AdminMainPage />} />
        <Route path="/volunteer_manage" element={<VolunteerManage />} />
        <Route path="/child_manage" element={<ChildManage />} />
        <Route path="/active_manage" element={<ActiveManage />} />

        {/* 테스트 페이지 */}
        <Route path="/test" element={<Waiting />} />

      </Routes>
    </>
  );
}

export default App;
