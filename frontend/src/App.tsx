import WhiteLogo from 'assets/logos/jonatam_logo_white.png'
import { API } from './config'
import { useEffect } from 'react'

export const App = () => {
  useEffect(() => {
    getHelth()
  }, [])

  const getHelth = () => {
    const url = `${API}/health`

    const configGetUserData = {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': 'application/json',
        mode: 'cors'
      }
    }

    fetch(url, configGetUserData)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error))
  }
  return (
    <section className='FatherContainer w-svw h-svh flex flex-col max-w-[1920px] m-auto'>
      <header className='w-full mx-auto flex items-center border-b-[1px] border-[#EEE3] py-[10px]'>
        <h1 className='mx-auto my-auto md:ml-[5%] text-[40px] text-p-white'>Printer</h1>
        <a className='webContianer mx-auto my-auto md:mr-[5%] flex flex-col' href='https://www.jonatam.com/' target='_blank' rel='noopener noreferrer'>
          <img className='w-[30px] m-auto object-contain' src={WhiteLogo} alt='icon web page' />
          <p className='text-[14px] m-auto text-center w-full'>Web</p>
        </a>
      </header>

      <main className='mainContainer m-auto flex w-full h-full overflow-hidden'>
        <section className='sidePanel m-auto p-[10px] w-[20%] h-full border-[#EEE3] border-r-[1px] overflow-y-auto flex flex-col'>
          <h2>Filters</h2>
        </section>

        <section className='principalSection w-[80%]'>
          <p>list section</p>
        </section>
      </main>
    </section>
  )
}
