import React ,{ useCallback} from "react";
import { Settings, Calendar, Compass } from "react-feather";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  // navbar
  const navigate = useNavigate();
  const handleOnClickCalender = useCallback(
    () => navigate("/calendar", { replace: true }),
    [navigate]
  );

  const handleOnClickSetting = useCallback(
    () => navigate("/setting", { replace: true }),
    [navigate]
  );
    
  const handleOnClickMap = useCallback(
    () => navigate("/map", { replace: true }),
    [navigate]
  );

  const Navbar = {
    Wrapper: styled.nav`
      flex: 1;
      padding: 1rem 3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: LightGray;
      width: 450px;
      height: 15vh;
    `,
    Logo: styled.h1`
      border: 1px solid gray;
      padding: 0.5rem 1rem;
    `,
    Items: styled.ul`
      display: flex;
      list-style: none;
    `,
    Item: styled.li`
      padding: 0 1rem;
      cursor: pointer;
    `,
  };

  const MobileNavbar = {
    Wrapper: styled(Navbar.Wrapper)`
      bottom: 0;
      justify-content: center;
    `,
    Items: styled(Navbar.Items)`
      flex: 1;
      padding: 0 2rem;
      justify-content: space-around;
    `,
    Item: styled(Navbar.Item)`
      display: flex;
      flex-direction: column;
      align-items: center;

      font-size: 1.2rem;
    `,
    Icon: styled.span``,
  };

  return (
    <div>
      <MobileNavbar.Items>
        <MobileNavbar.Item onClick={handleOnClickCalender}>
          <MobileNavbar.Icon>
            <Calendar size={18} />
          </MobileNavbar.Icon>
          Schedule
        </MobileNavbar.Item>
        <MobileNavbar.Item onClick={handleOnClickMap}>
          <MobileNavbar.Icon>
            <Compass size={18} />
          </MobileNavbar.Icon>
          Navigation
        </MobileNavbar.Item>
        <MobileNavbar.Item onClick={handleOnClickSetting}>
          <MobileNavbar.Icon>
            <Settings size={18} />
          </MobileNavbar.Icon>
          Settings
        </MobileNavbar.Item>
      </MobileNavbar.Items>
    </div>
  );
}
