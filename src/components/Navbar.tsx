import { Box, Flex, Heading, Input, InputGroup, InputLeftElement, Container } from '@chakra-ui/react'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {
    const [query, setQuery] = useState('')
    const navigate = useNavigate()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            navigate(`/?q=${encodeURIComponent(query)}`)
        }
    }

    return (
        <Box as="nav" bg="gray.800" py={4} position="sticky" top={0} zIndex={100}>
            <Container maxW="container.xl">
                <Flex justify="space-between" align="center" gap={4} direction={{ base: 'column', md: 'row' }}>
                    <Heading size="lg" color="brand.500" cursor="pointer" onClick={() => navigate('/')}>
                        MovieHub
                    </Heading>

                    <Box as="form" onSubmit={handleSearch} w={{ base: 'full', md: '400px' }}>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <Search size={20} color="gray.500" />
                            </InputLeftElement>
                            <Input
                                placeholder="Search movies & TV shows..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                bg="gray.700"
                                border="none"
                                _focus={{ ring: 2, ringColor: 'brand.500' }}
                            />
                        </InputGroup>
                    </Box>
                </Flex>
            </Container>
        </Box>
    )
}
