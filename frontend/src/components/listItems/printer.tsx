import { useEffect, useState } from 'react'
import { getItems } from './getItems'
import { toast, ToastContainer } from 'react-toastify'
import { itemsType } from 'src/utils/types'

export const Printer = () => {
  const [items, setItems] = useState<itemsType[]>([])
  const [loanding, setLoanding] = useState(false)

  // Mount
  useEffect(() => {
    console.log('Printer mounted')

    return () => { /* Unmout */ }
  }, [])

  const handleGetItems = async () => {
    setLoanding(true)
    const data = await getItems()
    setLoanding(false)
    if (data.data) {
      if (data.data.length > 50) {
        setItems(data.data.slice(0, 50))
      } else {
        setItems(data.data)
      }
    } else {
      toast.error(`${data.error.includes('Failed to fetch') ? 'Something went wrong in the server' : 'Something went wrong here'}`, {
        position: 'top-center',
        autoClose: 5000,
        closeOnClick: true,
        hideProgressBar: false,
        pauseOnHover: true,
        theme: 'dark'
      })
    }
  }

  return (
    <section className='printerContainer w-full h-full flex flex-col m-auto'>
      <ToastContainer
        theme='dark'
        limit={3}
        newestOnTop
        stacked
        toastClassName={() => 'relative flex p-3 min-w-max min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-[#000] border-p-white border-[1px]'}
      />
      <div className='infoCont w-full flex m-auto'>
        <p className='my-auto ml-[2%]'>Quantity: {items.length}</p>
        <button
          className='px-[10px] py-[2px] bg-p-white text-p-black rounded-md font-bold cursor-pointer m-auto mr-[2%] outline-none'
          onClick={handleGetItems}
          disabled={loanding}
        >
          {loanding ? 'Loading...' : 'Get random data'}
        </button>
      </div>
      <div className='listContainer gap-[10px] w-[99%] h-full max-h-[80dvh] m-auto py-[50px] flex flex-wrap justify-center items-center overflow-y-auto overflow-x-hidden'>
        {
          items.map((elem, idx) => {
            return (
              <article key={idx} className='itemCard relative w-[400px] h-auto border-[1px] border-[#EEE3] p-[10px] felx flex-col'>
                <img className='w-[150px] object-contain m-auto rounded-full my-[10px]' src={elem.image} alt={elem.name} />
                <h2 className='text-[30px] w-full text-center font-bold'>{elem.name}</h2>
                <h3 className='w-full text-center text-[14px] text-[#EEEC]'>{elem.age} yo</h3>
                <p className='w-[90%] my-[10px] mx-auto text-[12px] text-[#EEED] h-[150px] overflow-ellipsis overflow-hidden'>{elem.description}</p>
                <div className='tagsCont flex flex-wrap my-[10px] gap-[10px] w-full min-h-[100px] border-[#EEE3] border-t-[1px] pt-5'>
                  {
                    elem.abilities.map((e, i) => (<p className='tag bg-p-white text-p-black h-max font-bold text-[11px]' key={i}>{e}</p>))
                  }
                </div>
              </article>
            )
          })
        }
      </div>
    </section>
  )
}
