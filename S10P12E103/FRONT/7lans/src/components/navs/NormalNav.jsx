import React, { useRef } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../../store/userSlice";

import Logo from "../../images/7lans_logo.png";

const NavBar = styled.nav`
  position: fixed;
  width: 100%;
  height: 100px;
  background-color: rgb(255, 215, 3);
  top: 0;
  display: flex;
`;

const LogoImage = styled.img`
  height: 70px;
  margin-left: 48px;
  margin-top: 0.8rem;
`;

const ChildInfo = styled.div`
  display: flex;
  font-size: 35px;
  padding-top: 25px;
  padding-left: 20%;
  width: 100%;
`;

const NormalNav = () => {
  const userInfo = useSelector((state) => state.user.value);
  const childInfo = useSelector((state) => state.child.value);
  const volInfo = useSelector((state) => state.vol.value);
  const userType = useRef("");
  const location = useLocation();
  const dispatch = useDispatch();

  const resetData = () => {
    dispatch(updateUserInfo(""));
    localStorage.removeItem("jwtToken");
  };

  userType.current = userInfo.memberType;
  if (userType.current === "CHILD") {
    return (
      <NavBar className="shadow">
        <Link to="/child_main">
          <LogoImage src={Logo} alt="logo" />
        </Link>
        <ChildInfo>
          {location.pathname !== "/child_dinosaur_dict" ? (
            <>
              {volInfo ? (
                <p>{volInfo.volunteerName} 선생님과의 공간입니다</p>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
        </ChildInfo>
        <div
          style={{ display: "flex", flexDirection: "row", marginLeft: "auto" }}
        >
          {location.pathname === "/child_dinosaur_dict" ? (
            ""
          ) : (
            <Link
              style={{
                fontSize: "23px",
                textDecorationLine: "none",
                color: "black",
                width: "134px",
                alignSelf: "center",
                fontWeight: "bold",
                paddingBottom: '1px',
              }}
              to={"/child_dinosaur_dict"}
            >
              공룡도감
            </Link>
          )}
          <Link
            style={{
              fontSize: "23px",
              textDecorationLine: "none",
              color: "black",
              width: "110px",
              alignSelf: "center",
              fontWeight: "bold",
              paddingLeft: '4px',
              paddingBottom: '1px',
            }}
            to={"/"}
            onClick={() => resetData()}
          >
            로그아웃
          </Link>
        </div>
      </NavBar>
    );
  } else if (userType.current === "VOLUNTEER") {
    return (
      <NavBar className="shadow">
        <Link to="/volunteer_main">
          <LogoImage src={Logo} alt="logo" />
        </Link>
        <ChildInfo>
          {location.pathname !== "/dinosaur_dict" ? (
            <div style={{ width: "400px" }}>
              {childInfo && location.pathname !== "/active_docs" ? (
                <p>{childInfo.childName} 아동과의 공간입니다.</p>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </ChildInfo>
        <div
          style={{ display: "flex", flexDirection: "row", marginLeft: "auto" }}
        >
          {location.pathname === "/dinosaur_dict" ? (
            ""
          ) : (
            <Link
              style={{
                fontSize: "23px",
                textDecorationLine: "none",
                color: "black",
                width: "134px",
                alignSelf: "center",
                fontWeight: "bold",
                paddingBottom: '1px',
              }}
              to={"/dinosaur_dict"}
            >
              공룡도감
            </Link>
          )}
          <Link
            style={{
              fontSize: "23px",
              textDecorationLine: "none",
              color: "black",
              width: "110px",
              alignSelf: "center",
              fontWeight: "bold",
              paddingLeft: '4px',
              paddingBottom: '1px',
            }}
            to={"/"}
            onClick={() => resetData()}
          >
            로그아웃
          </Link>
        </div>
      </NavBar>
    );
  } else if (userType.current === "MANAGER") {
    return (
      <NavBar className="shadow">
        <Link to="/admin_main_page">
          <LogoImage src={Logo} alt="logo" />
        </Link>
        <ChildInfo>{/* {childInfo.childName} 학생과의 공간입니다 */}</ChildInfo>
        <Link
          to="/"
          style={{
            alignSelf: "center",
            fontSize: "23px",
            textDecorationLine: "none",
            color: "black",
            fontWeight: "bolder",
            position: "fixed",
            right: "30px",
          }}
        >
          로그아웃
        </Link>
      </NavBar>
    );
  }
  // else if (lo) {
  //   return (
  //   <NavBar className="shadow">
  //     <LogoImage src={Logo} alt="logo" />
  //     <div style={{display: 'flex', flexDirection: 'row', marginLeft: 'auto'}}>
  //         <Link
  //           style={{ fontSize: "23px", textDecorationLine: "none", color: 'black', width: '130px', alignSelf: 'center', fontWeight: 'bolder' }}
  //           to={"/dinosaur_dict"}
  //         >
  //           공룡도감
  //         </Link>
  //         <Link
  //           style={{ fontSize: "23px", textDecorationLine: "none", color: 'black', width: '110px', alignSelf: 'center', fontWeight: 'bolder' }}
  //           to={"/"}
  //           onClick={() => resetData()}
  //         >
  //           로그아웃
  //         </Link>
  //       </div>
  //   </NavBar>
  //   )
  // }
  else {
    return (
      <NavBar className="shadow">
        <LogoImage src={Logo} alt="logo" />
        <div
          style={{ display: "flex", flexDirection: "row", marginLeft: "auto" }}
        >
          <Link
            style={{
              fontSize: "23px",
              textDecorationLine: "none",
              color: "black",
              width: "130px",
              alignSelf: "center",
              fontWeight: "bolder",
            }}
            to={"/dinosaur_dict"}
          >
            공룡도감
          </Link>
          <Link
            style={{
              fontSize: "23px",
              textDecorationLine: "none",
              color: "black",
              width: "110px",
              alignSelf: "center",
              fontWeight: "bolder",
            }}
            to={"/"}
            onClick={() => resetData()}
          >
            로그아웃
          </Link>
        </div>
      </NavBar>
    );
  }
};

export default NormalNav;
