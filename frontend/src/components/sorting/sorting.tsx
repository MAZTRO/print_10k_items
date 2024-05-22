import Select from 'react-select'
import { sortingOptions, SortingStyles } from './selectOptions'

export const Sorting = () => {
  return (
    <section className='sortingContainer w-full mx-auto flex border-[#EEE3] border-b-[1px]'>
      <div className='tagsCont my-auto mx-auto ml-[10px] flex'>
        <p className='bg-p-white tag text-p-black font-bold flex-wrap items-center justify-center m-[5px] text-[14px]'>Name ascendat</p>
        <p className='bg-p-white tag text-p-black font-bold flex-wrap items-center justify-center m-[5px] text-[14px]'>Age descendant</p>
      </div>
      <div className='selectors my-auto mx-auto mr-[10px]'>
        <Select
          styles={SortingStyles}
          className='sorter w-[250px] m-auto text-p-white'
          options={sortingOptions}
          placeholder='Sort by...'
          isClearable
        />
      </div>
    </section>
  )
}
