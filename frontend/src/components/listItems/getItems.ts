import { API } from 'src/config'

export const getItems = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const response = await fetch(`${API}/random-users`, config)
    const data = await response.json()
    return { error: data.error, data: data.body }
  } catch (error) {
    return { error: (error as Error).message }
  }
}
