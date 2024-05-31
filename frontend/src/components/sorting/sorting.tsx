import Select from 'react-select'
import { sortingOptions, SortingStyles } from './selectOptions'
import { useSortingStore } from 'src/store/sortingStore'
import { sortingOptionsType } from 'src/utils/types'

export const Sorting = () => {
  const sortingStore = useSortingStore(state => state.sortingStore)
  const changeSortingStore = useSortingStore(state => state.changeSortingStore)

  return (
    <section className='sortingContainer w-full mx-auto flex border-[#EEE3] border-b-[1px]'>
      <div className='tagsCont my-auto mx-auto ml-[10px] flex overflow-x-auto overflow-y-hidden'>
        {
          sortingStore.label &&
            <p className='bg-p-white tag text-p-black font-bold flex-wrap items-center justify-center m-[5px] text-[14px]'>{sortingStore.label}</p>
        }
      </div>
      <div className='selectors my-auto mx-auto mr-[10px]'>
        <Select
          styles={SortingStyles}
          className='sorter w-[250px] min-w-max m-auto text-p-white'
          options={sortingOptions}
          placeholder='Sort by...'
          value={sortingStore}
          onChange={(e: sortingOptionsType) => {
            if (e) changeSortingStore(e)
            else changeSortingStore({ label: '', value: '' })
          }}
          isClearable
        />
      </div>
    </section>
  )
}
