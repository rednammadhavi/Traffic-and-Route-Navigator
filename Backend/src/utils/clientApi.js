import axios from 'axios'
import polyline from '@mapbox/polyline'

const GOOGLE_DIRECTIONS = 'https://maps.googleapis.com/maps/api/directions/json'

export const fetchRouteFromAPI = async (origin, destination, mode = "driving") => {
    try {
        const apiKey = process.env.MAPS_API_KEY
        if (!apiKey) throw new Error('Maps API key not configured')

        const url = `${GOOGLE_DIRECTIONS}?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&mode=${mode}&departure_time=now&traffic_model=best_guess&key=${apiKey}`

        const { data } = await axios.get(url)

        if (!data || data.status !== 'OK') {
            throw new Error(data?.error_message || 'Google Directions API error')
        }

        const route = data.routes[0]
        const leg = route.legs[0]

        const decoded = polyline.decode(route.overview_polyline.points)
        const path = decoded.map(([lat, lng]) => ({ lat, lng }))

        return {
            raw: route,
            distance: leg.distance?.text,
            duration: leg.duration?.text,
            duration_in_traffic: leg.duration_in_traffic?.text || leg.duration?.text,
            overview_polyline: route.overview_polyline?.points,
            path,
            summary: route.summary || '',
        }
    } catch (err) {
        throw new Error(err.message || 'Error fetching directions')
    }
}
