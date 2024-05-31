import { itemsType, LIMITER_LENGHT, sortingOptionsType } from 'src/utils/types'

/* Sort all items */
export const sortingItems = (
  filteredData: itemsType[],
  sortingStore: sortingOptionsType,
  threeMiddleIdx: React.MutableRefObject<number[]>,
  listItem: React.MutableRefObject<itemsType[][]>
): itemsType[] => {
  const tempList = filteredData

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

  if (sortedList.length > 0 && sortedList.length > LIMITER_LENGHT * 2) {
    const tempArr: itemsType[][] = []
    for (let i = 0; i < sortedList.length + 1; i++) {
      const tempIdx = (+([i]) || 1) % LIMITER_LENGHT === 0
      if (tempIdx) {
        tempArr.push(sortedList.slice(i - LIMITER_LENGHT, i))
      }
    }

    threeMiddleIdx.current = [0, 1]
    const slicedList = threeMiddleIdx.current.map(i => tempArr[i]).flat()
    listItem.current = tempArr
    return slicedList
  } else {
    listItem.current = [sortedList]
    threeMiddleIdx.current = [0]
    return sortedList
  }
}
