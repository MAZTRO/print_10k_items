const MODE_ENV = import.meta.env.MODE || 'development'
let portBackend = ''
let host = ''
const prefix = 'api/v01'

if (MODE_ENV === 'development') {
  portBackend = ':8000' // To local development
  host = 'localhost'
}
if (MODE_ENV === 'production') {
  host = window.location.hostname
  portBackend = '' // To production deployments
}

export const API = `${window.location.protocol}//${host}${portBackend}/${prefix}`
