import React, {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import "./Home.css";

export default function Home() {
    const navigate = useNavigate();
  const handleOnClick = useCallback(() => navigate("/login", { replace: true }), [
    navigate,
  ]);

  return (
    <div class="container h-100">
      <div class="phoneScreen onBoardingBackground" onClick={handleOnClick}>
        <div class="onBoardingBanner">
          <img src="/onboarding-banner.svg" alt="" srcset=""></img>
          <p id="registerText">Helping UC Davis students navigate</p>
          <p id="registerText">campus</p>
        </div>
      </div>
    </div>
  );
};

