import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube'
import { SongType } from '../../App'

type Props = {};
type SongIdParm = {
  id: string;
};
type ContextType = {
  songs: Array<SongType>;
}

const Player = (props: Props) => {
  const { songs } = useOutletContext<ContextType>();
  const params = useParams<SongIdParm>();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [youtubeLink, setYoutubeLink] = useState('');

  useEffect(() => {
    const id = params.id ? parseInt(params.id, 10) : 0;
    // const song = props.songs.find((song) => song.id === id);
    const song = songs.find((song) => song.id === id);

    if (song) {
      setTitle(song?.title ? song.title : "");
      setYoutubeLink(song?.youtube_link ? song.youtube_link : "");
    } else {
      navigate('/songs');
    }
  });
  
  return (
    <div className='modal'>
      <div className="box">
        <div className="heading">
          <Link className='menu' to='/songs'>
            <span className='float-start badge bg-secondary pointer'></span>
          </Link>
          <span className='title'>X {title}</span>
        </div>
        <div className="player">
          <div>
            <YouTube videoId={youtubeLink} opts={{ width: '320', height: '240', playerVars: {autoplay: 1} }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Player;