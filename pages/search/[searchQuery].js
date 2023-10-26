import { useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import SearchBar from '../../components/layout/search-bar'

export default function SearchResultPage(props) {

   const router = useRouter()
   const searchQuery = router.query.searchQuery
   const [ searchResult, setSearchResult ] = useState('')

   useEffect(() => {
    fetch(`/api/search/${searchQuery}`)
    .then(res => res.json())
    .then(data => setSearchResult(data) )
   },[searchQuery]
   ) 



  return (
    <div>
      <h1>why is not connecting</h1>
    </div>
  )
}
