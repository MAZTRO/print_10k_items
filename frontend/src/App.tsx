import WhiteLogo from 'assets/logos/jonatam_logo_white.png'
import { ListItems } from './components/listItems/listItems'
import { Filters } from './components/filtering/filters'
import 'react-toastify/dist/ReactToastify.css'

export const App = () => {
  return (
    <section className='FatherContainer w-svw h-svh flex flex-col max-w-[1920px] m-auto'>
      <div className='absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]' />
      <header className='w-full mx-auto flex items-center border-b-[1px] border-[#EEE3] py-[10px]'>
        <h1 className='mx-auto my-auto md:ml-[5%] text-[40px] text-p-white'>Printer</h1>
        <a className='webContianer mx-auto my-auto md:mr-[5%] flex flex-col' href='https://www.jonatam.com/' target='_blank' rel='noopener noreferrer'>
          <img className='w-[30px] m-auto object-contain' src={WhiteLogo} alt='icon web page' />
          <p className='text-[14px] m-auto text-center w-full'>My Web</p>
        </a>
      </header>

      <main className='mainContainer m-auto flex w-full h-full overflow-hidden'>
        <section className='sidePanel m-auto p-[10px] w-[15%] h-full border-[#EEE3] border-r-[1px] overflow-y-auto flex flex-col'>
          <Filters />
        </section>

        <section className='principalSection w-[85%] h-full m-auto flex flex-col'>
          <ListItems />
        </section>
      </main>
    </section>
  )
}
