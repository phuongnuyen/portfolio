import Rive from "@rive-app/react-canvas";
import playIcon from "../../assets/images/play.riv";
import charImg from "../../assets/images/alone.png";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="w-full h-full relative bg-white">
      {/* banner */}
      <div className="absolute m-auto flex left-[60px] right-[60px] h-full justify-center items-center">
        <div className="w-full">
          {/* images */}
          <img src={charImg} className="size-[120px] mb-[-16px] mx-auto" />

          {/* divider */}
          <div className="flex justify-center items-center w-full h-[44px] relative">
            <div className="h-[1px] bg-[#DFDED9] flex-1 relative" />
            <Rive
              className="h-[44px] w-[44px]"
              src={playIcon}
              stateMachines="normal"
            />
            <div className="h-[1px] bg-[#DFDED9] flex-1 relative" />
          </div>

          {/* shadow */}
          <div className="h-[50px] w-full mt-[-16px] reflect-shadow " />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
