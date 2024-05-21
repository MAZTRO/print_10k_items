const MODE_ENV = import.meta.env.MODE || 'development'
let portBackend = ''
const prefix = 'api/v01'

if (MODE_ENV === 'development') {
  portBackend = ':8000' // To local development
}
if (MODE_ENV === 'production') {
  portBackend = '' // To production deployments
}

console.log(MODE_ENV)

export const API = `${window.location.protocol}//${window.location.hostname}${portBackend}/${prefix}`
