import { apiClient, SearchResponse, MetadataResponse, SourceResponse } from './client'

export const searchContent = async (query: string): Promise<SearchResponse> => {
    const response = await apiClient.get<SearchResponse>(`/api/search/${encodeURIComponent(query)}`)
    return response.data
}

export const getContentMetadata = async (id: string): Promise<MetadataResponse> => {
    const response = await apiClient.get<MetadataResponse>(`/api/info/${id}`)
    return response.data
}

export const getStreamSources = async (id: string, season?: number, episode?: number): Promise<SourceResponse> => {
    let url = `/api/sources/${id}`
    const params = new URLSearchParams()

    if (season !== undefined) params.append('season', season.toString())
    if (episode !== undefined) params.append('episode', episode.toString())

    const queryString = params.toString()
    if (queryString) url += `?${queryString}`

    const response = await apiClient.get<SourceResponse>(url)
    return response.data
}
