import { Platform } from 'react-native';


export const API_BASE_URL = __DEV__ 
  ? Platform.select({
      android: 'http://10.0.2.2:3000',
      web: 'http://localhost:3000',
      default: 'http://localhost:3000'
    })
  : 'http://localhost:3000';