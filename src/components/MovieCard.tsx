import { Box, Image, Text, Badge, VStack, AspectRatio } from '@chakra-ui/react'
import { SearchResult } from '../api/client'
import { useNavigate } from 'react-router-dom'

interface MovieCardProps {
    movie: SearchResult
}

export const MovieCard = ({ movie }: MovieCardProps) => {
    const navigate = useNavigate()

    return (
        <Box
            bg="gray.800"
            borderRadius="lg"
            overflow="hidden"
            cursor="pointer"
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.02)' }}
            onClick={() => navigate(`/info/${movie.subjectId}`)}
        >
            <AspectRatio ratio={2 / 3}>
                <Image
                    src={movie.cover?.url}
                    alt={movie.title}
                    objectFit="cover"
                    fallbackSrc="https://via.placeholder.com/300x450?text=No+Image"
                />
            </AspectRatio>

            <VStack p={4} align="start" spacing={2}>
                <Text fontWeight="bold" noOfLines={1} title={movie.title}>
                    {movie.title}
                </Text>
                <Flex justify="space-between" w="full" align="center">
                    <Text fontSize="sm" color="gray.400">
                        {movie.releaseDate?.split('-')[0] || 'N/A'}
                    </Text>
                    <Badge colorScheme={movie.subjectType === 0 ? 'blue' : 'green'}>
                        {movie.subjectType === 0 ? 'Movie' : 'TV'}
                    </Badge>
                </Flex>
                <Text fontSize="xs" color="gray.500" noOfLines={1}>
                    {movie.genre}
                </Text>
            </VStack>
        </Box>
    )
}

import { Flex } from '@chakra-ui/react'
