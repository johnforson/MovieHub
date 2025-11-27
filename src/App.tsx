import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react'

import { Home } from './pages/Home'
import { Details } from './pages/Details'
import { Watch } from './pages/Watch'

function App() {
    return (
        <Router>
            <Box minH="100vh" bg="gray.900" color="white">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/info/:id" element={<Details />} />
                    <Route path="/watch/:id" element={<Watch />} />
                </Routes>
            </Box>
        </Router>
    )
}

export default App
