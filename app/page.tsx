import Pagination from './components/Pagination'

export default function Home({
  searchParams,
}: {
  searchParams: { page: string }
}) {
  return (
    <div>
      <Pagination
        currentPage={parseInt(searchParams.page)}
        pageSize={4}
        itemsCount={23}
      />
    </div>
  )
}
