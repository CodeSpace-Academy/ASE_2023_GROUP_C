/* eslint-disable */

import { buildAggregationPipelineForFilter, buildAggregationPipelineForSearch, sortingByFunction } from "../../../utils/dataFiltering";
import { getByAggregation } from "../../../utils/mongodb-utils";

// Function to handle GET requests
export default async function handler(req, res) {
    const filterVal = req.query.filter;
    const queryParams = filterVal.split('&');

    let allRecipes, pageNumber, filterObject, searchTitleQuery;
    let sortingObject = 'published(oldest)';

    queryParams.forEach(param => {
        const [key, value] = param.split('=');
        const filterValue = decodeURIComponent(value);

        switch (key) {
            case 'page':
                pageNumber = parseInt(filterValue);
                break;
            case 'search':
                searchTitleQuery = JSON.parse(filterValue);
                break;
            case 'filter':
                filterObject = JSON.parse(filterValue);
                break;
            case 'sorting':
                sortingObject = JSON.parse(filterValue);
                break;
            case 'all':
                allRecipes = JSON.parse(filterValue);
                break
            default:
                break;
        }
    });

    console.log('titleQuery:', searchTitleQuery);
    console.log('sortingObj: ', sortingObject);
    console.log('filterObject: ', filterObject);

    if (req.method === 'GET') {
        try {
            let aggregationPipeline = [];

            aggregationPipeline.push({ $sort: sortingByFunction(sortingObject) });

            if (allRecipes === undefined) {
                if (searchTitleQuery) {
                    buildAggregationPipelineForSearch(aggregationPipeline, searchTitleQuery)
                } else {
                    buildAggregationPipelineForFilter(aggregationPipeline, filterObject)
                }
            }

            const pageSize = 500;
            const skipPage = (pageNumber - 1) * pageSize;

            const aggregationPipelineWithPages = [
                ...aggregationPipeline,
                { $skip: skipPage },
                { $limit: pageSize }
            ];

            const recipeDocuments = await getByAggregation(
                'recipes',
                aggregationPipelineWithPages,
            );

            res.status(201).json({ message: recipeDocuments });
        } catch (error) {
            res.status(500).json({ message: 'Getting recipes failed' });
        }
    }
}
