import './App.css';
import { ConfigProvider } from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Lobby } from 'boardgame.io/react';
import PunsOfAnarchyGame from './PunsOfAnarchy/Game';
import PunsOfAnarchyBoard from './PunsOfAnarchy/Board';

const server = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://puns-of-anarchy-e392cdcca847.herokuapp.com/';
const importedGames = [{ game: PunsOfAnarchyGame, board: PunsOfAnarchyBoard }];

const App : React.FC = () => {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
      <DndProvider backend={HTML5Backend}>
        <h1>Lobby</h1>
        <Lobby gameServer={server} lobbyServer={server} gameComponents={importedGames} />
      </DndProvider>
    </ConfigProvider>
  )
}

export default App;
