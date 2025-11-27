import { Box, Container, Heading, AspectRatio, Center, Spinner, Text, Button } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { getStreamSources } from '../api/services'
import { Navbar } from '../components/Navbar'
import { ArrowLeft } from 'lucide-react'

export const Watch = () => {
    const { id } = useParams<{ id: string }>()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const season = searchParams.get('season') ? Number(searchParams.get('season')) : undefined
    const episode = searchParams.get('episode') ? Number(searchParams.get('episode')) : undefined

    const { data, isLoading, error } = useQuery({
        queryKey: ['sources', id, season, episode],
        queryFn: () => getStreamSources(id!, season, episode),
        enabled: !!id,
        staleTime: 0, // Do not cache sources as they expire
    })

    const source = data?.results?.find(s => s.quality === '720p') || data?.results?.[0]

    return (
        <>
            <Navbar />
            <Container maxW="container.xl" py={8}>
                <Button
                    leftIcon={<ArrowLeft />}
                    variant="ghost"
                    mb={4}
                    onClick={() => navigate(-1)}
                >
                    Back to Details
                </Button>

                {isLoading ? (
                    <Center h="60vh">
                        <Spinner size="xl" color="brand.500" />
                    </Center>
                ) : error || !source ? (
                    <Center h="60vh">
                        <Text color="red.400">Error loading video source. Please try again.</Text>
                    </Center>
                ) : (
                    <Box>
                        <AspectRatio ratio={16 / 9} bg="black" borderRadius="xl" overflow="hidden">
                            <video
                                controls
                                autoPlay
                                src={source.download_url}
                                style={{ width: '100%', height: '100%' }}
                            >
                                Your browser does not support the video tag.
                            </video>
                        </AspectRatio>
                        <Heading size="md" mt={4}>
                            Playing: {season ? `S${season} E${episode}` : 'Movie'} - {source.quality}
                        </Heading>
                    </Box>
                )}
            </Container>
        </>
    )
}
