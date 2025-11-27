import axios from 'axios'

export const API_BASE_URL = 'https://movieapi.giftedtech.co.ke'

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Types
export interface SearchResult {
    subjectId: string
    subjectType: number
    title: string
    releaseDate: string
    genre: string
    cover: {
        url: string
        width: number
        height: number
    }
    imdbRatingValue: string
    description: string
}

export interface SearchResponse {
    status: number
    success: string
    results: {
        pager: {
            hasMore: boolean
            totalCount: number
        }
        items: SearchResult[]
    }
}

export interface ContentMetadata {
    subject: {
        subjectId: string
        title: string
        description: string
        cover: { url: string }
        trailer: {
            videoAddress: { url: string }
            cover: { url: string }
        }
        stars: {
            name: string
            character: string
            avatarUrl: string
        }[]
    }
    resource: {
        seasons: {
            se: number
            maxEp: number
            resolutions: { resolution: number; epNum: number }[]
        }[]
    }
}

export interface MetadataResponse {
    status: number
    success: string
    results: ContentMetadata
}

export interface StreamSource {
    id: string
    quality: string
    download_url: string
    size: string
    format: string
}

export interface SourceResponse {
    status: number
    success: string
    results: StreamSource[]
}
