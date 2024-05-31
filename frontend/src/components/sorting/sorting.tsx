import Select from 'react-select'
import { sortingOptions, SortingStyles } from './selectOptions'
import { useSortingStore } from 'src/store/sortingStore'
import { useFilterStore } from 'src/store/filtersStore'
import { sortingOptionsType } from 'src/utils/types'

export const Sorting = () => {
  const nameFilter = useFilterStore(state => state.nameFilter)
  const sortingStore = useSortingStore(state => state.sortingStore)
  const descriptionFilter = useFilterStore(state => state.descriptionFilter)
  const changeSortingStore = useSortingStore(state => state.changeSortingStore)

  const arrayItems = [nameFilter, sortingStore.label, descriptionFilter]

  return (
    <section className='sortingContainer w-full mx-auto flex border-[#EEE3] border-b-[1px]'>
      <div className='tagsCont my-auto mx-auto py-[5px] ml-[10px] flex overflow-x-auto overflow-y-hidden'>
        {
          arrayItems.length > 0 &&
          arrayItems.map((item, idx) => {
            return (
              item &&
                <p key={idx} className='bg-p-white tag min-w-max text-p-black font-bold flex-wrap items-center justify-center m-[5px] text-[14px]'>{item}</p>
            )
          })
        }
      </div>
      <div className='selectors my-auto mx-auto mr-[10px]'>
        <Select
          styles={SortingStyles}
          className='sorter w-[250px] min-w-max m-auto text-p-white border-[#EEE3] border-l-[1px]'
          options={sortingOptions}
          placeholder='Sort by...'
          value={sortingStore}
          onChange={(e) => {
            if (e) changeSortingStore(e as sortingOptionsType)
            else changeSortingStore({ label: '', value: '' })
          }}
          isClearable
        />
      </div>
    </section>
  )
}
