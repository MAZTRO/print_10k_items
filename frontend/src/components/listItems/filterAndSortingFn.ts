import { itemsType, LIMITER_LENGHT } from 'src/utils/types'

/* Filter items */
export const filterByNameAndDescription = (
  originalItems: React.MutableRefObject<itemsType[][]>,
  debouncedNameFilter: string,
  debouncedDescriptionFilter: string,
  listItem: React.MutableRefObject<itemsType[][]>,
  threeMiddleIdx: React.MutableRefObject<number[]>
): { totalLength: number, initialArray: itemsType[] } => {
  const tempList = originalItems.current

  if (debouncedNameFilter === '' || debouncedDescriptionFilter === '') {
    listItem.current = originalItems.current
    const initialArray = threeMiddleIdx.current.map(i => originalItems.current[i]).flat()
    return { totalLength: originalItems.current.flat().length, initialArray }
  } else {
    const filteredListByName: itemsType[] = tempList.flat().filter(item => {
      return item.name.toLowerCase().includes(debouncedNameFilter.toLowerCase())
    })
    const filteredListByDescription: itemsType[] = tempList.flat().filter(item => {
      return item.description.toLowerCase().includes(debouncedDescriptionFilter.toLowerCase())
    })

    const filteredList = [filteredListByName, filteredListByDescription].flat()

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
  }
}
