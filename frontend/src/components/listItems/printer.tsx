import { useEffect, useState, useRef } from 'react'
import { getItems } from './getItems'
import { toast, ToastContainer } from 'react-toastify'
import { itemsType } from 'src/utils/types'
import { toastConfig } from 'src/utils/configToester'

export const Printer = () => {
  const listItem = useRef<itemsType[]>([])
  const totalIndxDown = useRef<number>(2)
  const totalIndxUp = useRef<number>(1)
  const threeMiddleIdx = useRef<number[]>([0])
  const [items, setItems] = useState<itemsType[]>([])
  const [totalitem, setTotalItems] = useState<number>(0)
  const [loanding, setLoanding] = useState(false)

  // Mount
  useEffect(() => {
    // Only use 60 items per scroll, slicing by 20 each time
    const scrollListContainer = document.getElementById('listContainer')
    const totalLenght = listItem.current.length - 1

    const modifyItems = () => {
      if (scrollListContainer) {
        const isDown = scrollListContainer.scrollTop + scrollListContainer.clientHeight >= (scrollListContainer.scrollHeight - 1)
        const isUp = scrollListContainer.scrollTop <= (scrollListContainer.clientHeight * 0.99) && threeMiddleIdx.current[0] > 0

        console.log('ALWAYS', totalIndxUp.current, totalIndxDown.current)

        if (isDown) {
          // Whit an array of 3 index, print the items of the big array with these 3 index
          // When scroll is down, push an upper number to index array and then shift() the first element

          console.log('ACTUAL DOWN', threeMiddleIdx.current, totalIndxDown.current, totalLenght)

          if (threeMiddleIdx.current.length > 2 && totalIndxDown.current <= totalLenght) {
            threeMiddleIdx.current.shift()
            totalIndxUp.current = threeMiddleIdx.current[0]

            console.log('LAST DOWN', threeMiddleIdx.current, totalIndxDown.current, totalLenght)
          } else {
            const isTotalLength = threeMiddleIdx.current[threeMiddleIdx.current.length - 1] === totalLenght
            if (!isTotalLength && totalIndxDown.current <= totalLenght) {
              threeMiddleIdx.current.push(totalIndxDown.current)
              totalIndxDown.current = threeMiddleIdx.current[threeMiddleIdx.current.length - 1] + (isTotalLength ? 0 : 1)
            }
          }

          const tempListDown = threeMiddleIdx.current.map(i => listItem.current[i]).flat()
          setItems(tempListDown)
        } else if (isUp) {
          // Whit an array of 3 index, print the items of the big array with these 3 index
          // When scroll is down, push an upper number to index array and then shift() the first element

          const isZero = threeMiddleIdx.current[0] < 1

          if (threeMiddleIdx.current.length > 2) {
            threeMiddleIdx.current.pop()
            totalIndxDown.current = threeMiddleIdx.current[threeMiddleIdx.current.length - 1] + 1
          } else {
            if (threeMiddleIdx.current[0] > 0) {
              threeMiddleIdx.current.unshift(threeMiddleIdx.current[0] - (isZero ? 0 : 1))
              scrollListContainer.scrollTo({ top: scrollListContainer.scrollHeight / 2 })
            }
          }

          console.log('UP', threeMiddleIdx.current, totalIndxUp.current, totalLenght)
          const tempListUp = threeMiddleIdx.current.map(i => listItem.current[i]).flat()
          setItems(tempListUp)
        }
      }
    }
    scrollListContainer?.addEventListener('scroll', modifyItems)

    return () => {
      scrollListContainer?.removeEventListener('scroll', modifyItems)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listItem, items])

  const handleGetItems = async () => {
    setLoanding(true)
    const data = await getItems()
    setLoanding(false)
    if (data.data) {
      setTotalItems(data.data.length)
      const limit = 20
      if (data.data.length > limit) {
        const tempArr: itemsType[] = []

        for (let i = 0; i < data.data.length + 1; i++) {
          const tempIdx = (+([i]) || 1) % limit === 0
          if (tempIdx) {
            tempArr.push(data.data.slice(i - limit, i))
          }
        }

        if (tempArr.length > 2) {
          const initialArray = [0, 1].map(i => tempArr[i]).flat()
          threeMiddleIdx.current = [0, 1]
          setItems(initialArray)
        } else {
          const initialArray = [0].map(i => tempArr[i]).flat()
          setItems(initialArray)
        }

        listItem.current = tempArr
      } else {
        setItems(data.data)
      }
    } else {
      const errorMsg = `${data.error.includes('Failed to fetch') ? 'Something went wrong in the server' : 'Something went wrong here'}`
      toast.error(errorMsg, toastConfig)
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
        <p className='my-auto ml-[2%]'>temp: {items.length} - total: {totalitem}</p>
        <button
          className='px-[10px] py-[2px] bg-p-white text-p-black rounded-md font-bold cursor-pointer m-auto mr-[2%] outline-none'
          onClick={handleGetItems}
          disabled={loanding}
        >
          {loanding ? 'Loading...' : 'Get random data'}
        </button>
      </div>
      <div id='listContainer' className='listContainer gap-[10px] w-[99%] h-full max-h-[80dvh] m-auto py-[50px] flex flex-wrap justify-center items-center overflow-y-auto overflow-x-hidden'>
        {
          items.length < 1 &&
            <p className='text-[16px] text-center'>No data</p>
        }
        {
          items.map((elem, idx) => {
            return (
              <article id={`card_${elem.id}`} key={idx} className='itemCard relative w-[400px] h-auto border-[1px] border-[#EEE3] p-[10px] felx flex-col'>
                <p className='absolute top-0 left-[5px] text-[14px]'>{elem.id}</p>
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
