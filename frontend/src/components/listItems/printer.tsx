import { useEffect, useState, useRef } from 'react'
import { getItems } from './getItems'
import { toast, ToastContainer } from 'react-toastify'
import { itemsType, LIMITER_LENGHT } from 'src/utils/types'
import { toastConfig } from 'src/utils/configToester'
import { useSortingStore } from 'src/store/sortingStore'
import { useFilterStore } from 'src/store/filtersStore'
import { modifyItems } from './modifyItemsFn'
import { useDebounce } from 'use-debounce'
import { filterByNameAndDescription } from './filterAndSortingFn'

export const Printer = () => {
  const nameFilter = useFilterStore(state => state.nameFilter)
  const sortingStore = useSortingStore(state => state.sortingStore)
  const descriptionFilter = useFilterStore(state => state.descriptionFilter)
  const [debouncedNameFilter] = useDebounce(nameFilter, 500)
  const [debouncedDescriptionFilter] = useDebounce(descriptionFilter, 500)

  const totalIndxUp = useRef<number>(1)
  const totalIndxDown = useRef<number>(2)
  const listItem = useRef<itemsType[][]>([])
  const threeMiddleIdx = useRef<number[]>([0])
  const [loanding, setLoanding] = useState(false)
  const originalItems = useRef<itemsType[][]>([])
  const [items, setItems] = useState<itemsType[]>([])
  const [totalitem, setTotalItems] = useState<number>(0)

  // Mount
  useEffect(() => {
    // Only use 60 items per scroll, slicing by 20 each time
    const scrollListContainer = document.getElementById('listContainer')
    const totalLenght = listItem.current.length - 1

    const handleScroll = () => {
      const tempList = modifyItems(
        scrollListContainer,
        totalLenght,
        threeMiddleIdx,
        totalIndxDown,
        totalIndxUp,
        listItem,
        items
      )
      if (tempList) {
        setItems(tempList)
      }
    }

    scrollListContainer?.addEventListener('scroll', handleScroll)

    return () => {
      scrollListContainer?.removeEventListener('scroll', handleScroll)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listItem, items])

  useEffect(() => {
    if (originalItems.current.length > 0) handleSortStoreChanges()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortingStore])

  useEffect(() => {
    if (originalItems.current.length > 0) {
      const { initialArray, totalLength } = filterByNameAndDescription(
        originalItems,
        debouncedNameFilter,
        debouncedDescriptionFilter,
        listItem,
        threeMiddleIdx
      )

      setTotalItems(totalLength)
      setItems(initialArray)
      console.log('FILTERING')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedNameFilter, debouncedDescriptionFilter])

  /* Sort all items */
  const handleSortStoreChanges = () => {
    const tempList = listItem.current

    const sortedList: itemsType[] = tempList.flat().sort((a, b) => {
      if (sortingStore.value === 'ageDesc') {
        return b.age - a.age
      } else if (sortingStore.value === 'ageAsc') {
        return a.age - b.age
      } else if (sortingStore.value === 'nameAsc') {
        return a.name.localeCompare(b.name)
      } else if (sortingStore.value === 'nameDesc') {
        return b.name.localeCompare(a.name)
      } else if (sortingStore.value === '') {
        return a.id - b.id
      } else {
        return 0
      }
    })

    const tempArr: itemsType[][] = []
    for (let i = 0; i < sortedList.length + 1; i++) {
      const tempIdx = (+([i]) || 1) % LIMITER_LENGHT === 0
      if (tempIdx) {
        tempArr.push(sortedList.slice(i - LIMITER_LENGHT, i))
      }
    }

    const slicedList = threeMiddleIdx.current.map(i => tempArr[i]).flat()

    setItems(slicedList)
    listItem.current = tempArr
  }

  /* Get all items */
  const handleGetItems = async () => {
    setLoanding(true)
    const data = await getItems()
    setLoanding(false)

    if (data.data) {
      setTotalItems(data.data.length)
      if (data.data.length > LIMITER_LENGHT) {
        const tempArr: itemsType[][] = []

        for (let i = 0; i < data.data.length + 1; i++) {
          const tempIdx = (+([i]) || 1) % LIMITER_LENGHT === 0
          if (tempIdx) {
            tempArr.push(data.data.slice(i - LIMITER_LENGHT, i))
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
        originalItems.current = tempArr
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
        <p className='my-auto ml-[2%]'>Actual: {items.length} - Total: {new Intl.NumberFormat().format(totalitem)}</p>
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
                <p className='absolute top-0 left-[5px] text-[14px]'>ID: {elem.id}</p>
                <p className='absolute top-0 right-[5px] text-[14px]'>#{listItem.current.flat().map((el) => el.id).indexOf(elem.id) + 1} of {new Intl.NumberFormat().format(totalitem)}</p>
                <p className='absolute bottom-0 left-[5px] text-[14px]'>#{idx + 1} of {items.length}</p>
                <img className='w-[150px] object-contain m-auto rounded-full my-[10px]' src={elem.image} alt={elem.name} />
                <h2 className='text-[30px] w-full text-center font-bold'>{elem.name}</h2>
                <h3 className='w-full text-center text-[14px] text-[#EEEC]'>{elem.age} yo</h3>
                <p className='w-[90%] my-[10px] mx-auto text-[12px] text-[#EEED] h-[150px] overflow-ellipsis overflow-hidden'>{elem.description}</p>
                <div className='tagsCont flex flex-wrap my-[10px] gap-[10px] w-full min-h-[100px] border-[#EEE3] border-t-[1px] pt-5'>
                  {
                    elem.abilities &&
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
