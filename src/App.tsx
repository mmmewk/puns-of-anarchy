import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import PunsOfAnarchy from './PunsOfAnarchy';
import { ConfigProvider } from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App : React.FC = () => {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <Routes>
            <Route path='/puns-of-anarchy/:playerId' element={<PunsOfAnarchy />} />
          </Routes>
        </BrowserRouter>
      </DndProvider>
    </ConfigProvider>
  )
}

export default App;
