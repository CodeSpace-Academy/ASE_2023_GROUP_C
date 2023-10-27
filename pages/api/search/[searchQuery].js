// const DUMMYDATA = {
    
//         "_id": "6b432ef8-a563-4eef-9f31-827987a3e0c9",
//         "title": "Butter Pecan Cookies",
//         "description": "Make and share this Butter Pecan Cookies recipe from Food.com.",
//         "prep": 55,
//         "cook": 9,
//         "category": "Dessert",
//         "servings": "",
//         "published": "1999-09-07T00:00:00.000Z",
//         "tags": [
//           "Cookie & Brownie",
//           "Fruit",
//           "Nuts",
//           "Weeknight",
//           "Oven",
//           "< 4 Hours"
//         ],
//         "ingredients": {
//           "butter": "3/4",
//           "brown sugar": "1/2",
//           "granulated sugar": "1",
//           "vanilla extract": "1",
//           "flour": "1",
//           "pecan halves": "2"
//         },
//         "images": [
//           "https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/47/picfnmxck.jpg",
//           "https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/47/picCPvxZU.jpg"
//         ],
//         "instructions": [
//           "Preheat oven to 350 degrees.",
//           "Cream butter in large mixing bowl.",
//           "Gradually add brown sugar and granulated sugar.",
//           "Cream well.",
//           "Add unbeaten egg yolk and vanilla and beat well.",
//           "Blend in sifted flour to form a stiff dough.",
//           "Shape dough into small balls.",
//           "Place on greased cookie sheet. Flatten cookies with bottom of glass dipped in sugar.",
//           "Bake at 350 degrees for 7-9 minutes, till golden brown (do not overbrown.) Cool before frosting.",
//           "Garnish with pecan halves."
//         ],
//         "nutrition": {
//           "calories": "69",
//           "fat": "5.6",
//           "saturated": "1.4",
//           "sodium": "15",
//           "carbohydrates": "4.5",
//           "fiber": "0.6",
//           "sugar": "1.6",
//           "protein": "0.8"
//         }
//       }
import { getAllRecipes } from "../../../utils/mongodb-utils";



export default async function handler(req, res) {
    
        
    if ( req.method === 'GET') {
        // const userQuery = req.query.searchQuery === 'all' ? '': req.query.searchQuery; // User's search query
        const userQuery = req.query.searchQuery  // User's search query
        const regexPattern = new RegExp(`.*${userQuery}.*`, "i")
    
        const recipes =  await getAllRecipes(

            'recipes',
            {_id: -1},
            2,
            {
                title: { $regex: regexPattern }
            }
        );
        res.status(200).json({message: recipes })
    }
}
