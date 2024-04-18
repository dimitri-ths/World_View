import { api } from '../ServiceHelper'

export const fetchUsersData = async () => {
  return await api.get('/all').then((response: { data: any }) => response.data)
}

export const fetchUserData = async (ccn3: string | undefined) => {
  return await api.get('/alpha/' + ccn3).then((response: { data: any }) => response.data)
}

export const fetchsearchData = async (name: string) => {
  try {
    const res = await api.get('/name/' + name).then((response) => response.data)
    return res
  } catch (error) {
    return []
  }
}
