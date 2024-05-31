import { create } from 'zustand'
import { sortingOptionsType, sortingStoreType } from 'src/utils/types'

export const useSortingStore = create<sortingStoreType>((set) => ({
  sortingStore: { label: '', value: '' },
  changeSortingStore: (data: sortingOptionsType) => set(() => ({ sortingStore: data }))
}))
