import { useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import SearchBar from '../../components/layout/search-bar'
import RecipeList from '../../components/recipeList/recipeList'

export default function SearchResultPage(props) {

   const router = useRouter()
   const searchQuery = router.query.searchQuery
   const [ searchResult, setSearchResult ] = useState('')

   useEffect(() => {
    fetch(`/api/search/${searchQuery}`)
    .then(res => res.json())
    .then(data => setSearchResult(data.message) )
   },[searchQuery]
   ) 

   if (!searchResult) return <h1>Loading...</h1>



  return (
    <div>
      <RecipeList recipes={searchResult} totalRecipeInDb={0} />
    </div>
  )
}
