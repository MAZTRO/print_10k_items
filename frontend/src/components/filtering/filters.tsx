import { useFilterStore } from 'src/store/filtersStore'

export const Filters = () => {
  const nameFilter = useFilterStore(state => state.nameFilter)
  const changeNameFilter = useFilterStore(state => state.changeNameFilter)
  const descriptionFilter = useFilterStore(state => state.descriptionFilter)
  const changeDescriptionFilter = useFilterStore(state => state.changeDescriptionFilter)

  return (
    <section className='listContainer w-full h-full flex flex-col'>
      <h2 className='text-[20px] w-full text-center mb-[20px] '>Filters</h2>
      <div className='basicFilters w-[90%] flex flex-col m-auto my-0 gap-[10px]'>
        <label htmlFor='filterName' className='w-full flex flex-col'>
          <p>By Name</p>
          <input
            id='filterName'
            className='w-full px-[5%] py-[3px] bg-p-white text-p-black rounded-[5px] placeholder:text-inherit placeholder:opacity-70 outline-none'
            type='text'
            placeholder='By name...'
            value={nameFilter}
            onChange={e => changeNameFilter(e.target.value)}
          />
        </label>

        <label htmlFor='filterName' className='w-full flex flex-col'>
          <p>By description</p>
          <input
            id='filterName'
            className='w-full px-[5%] py-[3px] bg-p-white text-p-black rounded-[5px] placeholder:text-inherit placeholder:opacity-70 outline-none'
            type='text'
            placeholder='By description...'
            value={descriptionFilter}
            onChange={e => changeDescriptionFilter(e.target.value)}
          />
        </label>
      </div>
    </section>
  )
}
