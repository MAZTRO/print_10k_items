import { create } from 'zustand'
import { filtersStoreType } from 'src/utils/types'

export const useFilterStore = create<filtersStoreType>((set) => ({
  nameFilter: '',
  descriptionFilter: '',
  changeNameFilter: (data: string) => set(() => ({ nameFilter: data })),
  changeDescriptionFilter: (data: string) => set(() => ({ descriptionFilter: data }))
}))
