import { Container, SimpleGrid, Text, Center, Spinner } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { searchContent } from '../api/services'
import { Navbar } from '../components/Navbar'
import { MovieCard } from '../components/MovieCard'

export const Home = () => {
    const [searchParams] = useSearchParams()
    const query = searchParams.get('q') || 'Avengers' // Default search

    const { data, isLoading, error } = useQuery({
        queryKey: ['search', query],
        queryFn: () => searchContent(query),
        enabled: !!query,
    })

    return (
        <>
            <Navbar />
            <Container maxW="container.xl" py={8}>
                {isLoading ? (
                    <Center h="50vh">
                        <Spinner size="xl" color="brand.500" />
                    </Center>
                ) : error ? (
                    <Center h="50vh">
                        <Text color="red.400">Error loading content</Text>
                    </Center>
                ) : (
                    <SimpleGrid columns={{ base: 2, md: 3, lg: 4, xl: 5 }} spacing={6}>
                        {data?.results?.items?.map((movie) => (
                            <MovieCard key={movie.subjectId} movie={movie} />
                        ))}
                    </SimpleGrid>
                )}
            </Container>
        </>
    )
}
