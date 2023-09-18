import './App.css';
import { ConfigProvider, Layout } from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import NewGame from './Components/NewGame';
import JoinGame from './Components/JoinGame';
import MatchLobby from './Components/MatchLobby';
import Match from './Components/Match';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

const { Content } = Layout;

const App : React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
        <DndProvider backend={HTML5Backend}>
          <Layout>
            <Content style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              <BrowserRouter>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/new' element={<NewGame />} />
                  <Route path='/join' element={<JoinGame />} />
                  <Route path='/matches/:matchId/lobby' element={<MatchLobby />} />
                  <Route path='/matches/:matchId/play' element={<Match />} />
                </Routes>
              </BrowserRouter>
            </Content>
          </Layout>
        </DndProvider>
      </ConfigProvider>
    </QueryClientProvider>
  )
}

export default App;
