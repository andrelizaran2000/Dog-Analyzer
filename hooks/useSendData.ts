// Modules
import { useQuery } from 'react-query'

// Api
import { sendImageApi } from '../api'

export default function useSendImage(image:string) {
  return useQuery('send-image', () => sendImageApi(image), {
    enabled:false
  });
}
