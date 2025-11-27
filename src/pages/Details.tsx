import {
    Box, Container, Grid, GridItem, Image, Heading, Text,
    VStack, HStack, Badge, Button, Avatar, SimpleGrid,
    Select, Spinner, Center, AspectRatio
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { getContentMetadata } from '../api/services'
import { Navbar } from '../components/Navbar'
import { Play } from 'lucide-react'
import { useState } from 'react'

export const Details = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [selectedSeason, setSelectedSeason] = useState<number>(1)

    const { data, isLoading, error } = useQuery({
        queryKey: ['details', id],
        queryFn: () => getContentMetadata(id!),
        enabled: !!id,
    })

    if (isLoading) return <Center h="100vh"><Spinner size="xl" color="brand.500" /></Center>
    if (error || !data) return <Center h="100vh"><Text>Error loading details</Text></Center>

    const { subject, resource } = data.results
    const isTvShow = resource?.seasons?.length > 0
    const seasons = resource?.seasons || []

    const handleWatch = (season?: number, episode?: number) => {
        let url = `/watch/${subject.subjectId}`
        if (isTvShow) {
            url += `?season=${season}&episode=${episode}`
        }
        navigate(url)
    }

    return (
        <>
            <Navbar />
            <Box
                bgImage={`linear-gradient(to bottom, rgba(26,32,44,0.8), #171923), url(${subject.cover?.url})`}
                bgSize="cover"
                bgPosition="center"
                minH="100vh"
                py={8}
            >
                <Container maxW="container.xl">
                    <Grid templateColumns={{ base: '1fr', md: '300px 1fr' }} gap={8}>
                        <GridItem>
                            <Image
                                src={subject.cover?.url}
                                borderRadius="xl"
                                boxShadow="2xl"
                                w="full"
                            />
                            {!isTvShow && (
                                <Button
                                    leftIcon={<Play fill="currentColor" />}
                                    colorScheme="brand"
                                    size="lg"
                                    w="full"
                                    mt={4}
                                    onClick={() => handleWatch()}
                                >
                                    Watch Now
                                </Button>
                            )}
                        </GridItem>

                        <GridItem color="white">
                            <VStack align="start" spacing={4}>
                                <Heading size="2xl">{subject.title}</Heading>
                                <Text fontSize="lg" color="gray.300">{subject.description}</Text>

                                <Box w="full">
                                    <Heading size="md" mb={4}>Cast</Heading>
                                    <HStack spacing={4} overflowX="auto" pb={4}>
                                        {subject.stars?.map((star) => (
                                            <VStack key={star.name} minW="100px">
                                                <Avatar src={star.avatarUrl} size="lg" name={star.name} />
                                                <Text fontSize="sm" textAlign="center">{star.name}</Text>
                                                <Text fontSize="xs" color="gray.400" textAlign="center">{star.character}</Text>
                                            </VStack>
                                        ))}
                                    </HStack>
                                </Box>

                                {isTvShow && (
                                    <Box w="full">
                                        <HStack justify="space-between" mb={4}>
                                            <Heading size="md">Episodes</Heading>
                                            <Select
                                                w="150px"
                                                value={selectedSeason}
                                                onChange={(e) => setSelectedSeason(Number(e.target.value))}
                                                bg="gray.700"
                                                borderColor="gray.600"
                                            >
                                                {seasons.map((s) => (
                                                    <option key={s.se} value={s.se}>Season {s.se}</option>
                                                ))}
                                            </Select>
                                        </HStack>

                                        <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4}>
                                            {Array.from({ length: seasons.find(s => s.se === selectedSeason)?.maxEp || 0 }).map((_, idx) => {
                                                const epNum = idx + 1
                                                return (
                                                    <Button
                                                        key={epNum}
                                                        variant="outline"
                                                        colorScheme="gray"
                                                        onClick={() => handleWatch(selectedSeason, epNum)}
                                                        leftIcon={<Play size={16} />}
                                                        justifyContent="start"
                                                    >
                                                        Episode {epNum}
                                                    </Button>
                                                )
                                            })}
                                        </SimpleGrid>
                                    </Box>
                                )}
                            </VStack>
                        </GridItem>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}
