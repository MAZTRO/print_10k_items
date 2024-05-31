import { itemsType, LIMITER_LENGHT } from 'src/utils/types'

/* Filter items by texts */
export const filterByNameAndDescription = (
  originalItems: React.MutableRefObject<itemsType[][]>,
  nameFilter: string,
  descriptionFilter: string,
  listItem: React.MutableRefObject<itemsType[][]>,
  threeMiddleIdx: React.MutableRefObject<number[]>
): { totalLength: number, initialArray: itemsType[] } => {
  const tempList = originalItems.current

  if (nameFilter && descriptionFilter) {
    /* ======= BY BOTH NAME AND DESCRIPTION ============ */

    const filteredListByName: itemsType[] = tempList.flat().filter(item => {
      return item.name.toLowerCase().includes(nameFilter.toLowerCase())
    })
    const filteredListByDescription: itemsType[] = tempList.flat().filter(item => {
      return item.description.toLowerCase().includes(descriptionFilter.toLowerCase())
    })

    const filteredList = [filteredListByName, filteredListByDescription].flat()
    const polishedList = filteredList.filter((ele, idx) => filteredList.indexOf(ele) !== idx)

    if (polishedList.length > 0 && polishedList.length > LIMITER_LENGHT * 2) {
      const tempArr: itemsType[][] = []
      for (let i = 0; i < polishedList.length + 1; i++) {
        const tempIdx = (+([i]) || 1) % LIMITER_LENGHT === 0
        if (tempIdx) {
          tempArr.push(polishedList.slice(i - LIMITER_LENGHT, i))
        }
      }

      threeMiddleIdx.current = [0, 1]
      const slicedList = threeMiddleIdx.current.map(i => tempArr[i]).flat()
      listItem.current = tempArr
      return { totalLength: polishedList.length, initialArray: slicedList }
    } else {
      listItem.current = [polishedList]
      threeMiddleIdx.current = [0]
      return { totalLength: polishedList.length, initialArray: polishedList }
    }
  } else if (nameFilter) {
    /* ======= BY NAME ============ */

    const filteredListByName: itemsType[] = tempList.flat().filter(item => {
      return item.name.toLowerCase().includes(nameFilter.toLowerCase())
    })

    const filteredList = [filteredListByName].flat()

    if (filteredList.length > 0 && filteredList.length > LIMITER_LENGHT) {
      const tempArr: itemsType[][] = []
      for (let i = 0; i < filteredList.length + 1; i++) {
        const tempIdx = (+([i]) || 1) % LIMITER_LENGHT === 0
        if (tempIdx) {
          tempArr.push(filteredList.slice(i - LIMITER_LENGHT, i))
        }
      }

      threeMiddleIdx.current = [0, 1]
      const slicedList = threeMiddleIdx.current.map(i => tempArr[i]).flat()
      listItem.current = tempArr
      return { totalLength: filteredList.length, initialArray: slicedList }
    } else {
      listItem.current = [filteredList]
      threeMiddleIdx.current = [0]
      return { totalLength: filteredList.length, initialArray: filteredList }
    }
  } else if (descriptionFilter) {
    /* ======= BY DESCRIPTION ============ */

    const filteredListByDescription: itemsType[] = tempList.flat().filter(item => {
      return item.description.toLowerCase().includes(descriptionFilter.toLowerCase())
    })

    const filteredList = [filteredListByDescription].flat()

    if (filteredList.length > 0 && filteredList.length > LIMITER_LENGHT) {
      const tempArr: itemsType[][] = []
      for (let i = 0; i < filteredList.length + 1; i++) {
        const tempIdx = (+([i]) || 1) % LIMITER_LENGHT === 0
        if (tempIdx) {
          tempArr.push(filteredList.slice(i - LIMITER_LENGHT, i))
        }
      }

      threeMiddleIdx.current = [0, 1]
      const slicedList = threeMiddleIdx.current.map(i => tempArr[i]).flat()
      listItem.current = tempArr
      return { totalLength: filteredList.length, initialArray: slicedList }
    } else {
      listItem.current = [filteredList]
      threeMiddleIdx.current = [0]
      return { totalLength: filteredList.length, initialArray: filteredList }
    }
  } else {
    /* ======= BY NONE ============ */

    listItem.current = originalItems.current
    const initialArray = threeMiddleIdx.current.map(i => originalItems.current[i]).flat()
    return { totalLength: originalItems.current.flat().length, initialArray }
  }
}
