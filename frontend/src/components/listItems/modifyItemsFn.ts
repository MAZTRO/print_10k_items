import { itemsType, LIMITER_LENGHT } from 'src/utils/types'

export const modifyItems = (
  scrollListContainer: HTMLElement | null,
  totalLenght: number,
  threeMiddleIdx: React.MutableRefObject<number[]>,
  totalIndxDown: React.MutableRefObject<number>,
  totalIndxUp: React.MutableRefObject<number>,
  listItem: React.MutableRefObject<itemsType[][]>,
  items: itemsType[]
): itemsType[] | undefined => {
  if (scrollListContainer) {
    const isDown = ((scrollListContainer.scrollTop + scrollListContainer.clientHeight) >= (scrollListContainer.scrollHeight - 1))
    const isUp = scrollListContainer.scrollTop <= (scrollListContainer.clientHeight * 0.99) && threeMiddleIdx.current[0] > 0

    if (isDown) {
      // Whit an array of 3 index, print the items of the big array with these 3 index
      // When scroll is down, push an upper number to index array and then shift() the first element
      if (threeMiddleIdx.current.length > 2 && totalIndxDown.current <= totalLenght) {
        threeMiddleIdx.current.shift()
        totalIndxUp.current = threeMiddleIdx.current[0]
      } else {
        const isTotalLength = threeMiddleIdx.current[threeMiddleIdx.current.length - 1] === totalLenght

        if (!isTotalLength && totalIndxDown.current <= totalLenght) {
          threeMiddleIdx.current.push(totalIndxDown.current)
          totalIndxDown.current = threeMiddleIdx.current[threeMiddleIdx.current.length - 1] + (isTotalLength ? 0 : 1)
        }
      }

      const tempListDown = threeMiddleIdx.current.map(i => listItem.current[i]).flat()

      return tempListDown
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

          const offsetByLayout = 0.42 // This is the ofset to get a perfect scroll to samesless transition
          const firstElementInItems = document.getElementById(`card_${items[0].id}`)
          const elementsByWindow = (scrollListContainer.clientHeight / (firstElementInItems ? firstElementInItems?.scrollHeight : 1) + offsetByLayout)
          const isFisrtElemnt = firstElementInItems ? firstElementInItems?.scrollHeight : 0

          scrollListContainer.scrollTo({ top: isFisrtElemnt * (LIMITER_LENGHT / elementsByWindow) })
        }
      }
      const tempListUp = threeMiddleIdx.current.map(i => listItem.current[i]).flat()
      return tempListUp
    }
  } else {
    return items
  }
}
