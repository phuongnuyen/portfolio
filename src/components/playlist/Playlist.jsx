import MusicVisualizer from "../musicVisualizer/MusicVisualizer";
import christmas from "../../assets/images/song_album/christmas.jpeg";
import PropTypes from 'prop-types';
import PlaylistSwicher from "./PlaylistSwitcher";

const Playlist = ({size}) => {
  return (
    <div>
      {/* <MusicVisualizer width={size} height={500} waveMaxHeight={30} /> */}
      {/* <div className={`absolute right-[-90px] top-0 m-auto w-[${size}px] h-[${size}px]`}> */}
      <PlaylistSwicher
        albums={[{ id: 1, image: christmas, isSelected: true }]}
        size={size}
        pointerSize={44}
      />
      {/* </div> */}
    </div>
  );
};

export default Playlist;

Playlist.propTypes = {
  size: PropTypes.number,
  pointerSize: PropTypes.number
}
