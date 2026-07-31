import { useQuery } from '@tanstack/react-query'
import axios from 'axios'



export const useGetContributor = () => {
  return useQuery(['Contributor'], async () => {
    return axios.get('https://api.github.com/repos/Ryan-eng-del/intelligence-learn/contributors'
    )
  })
}
