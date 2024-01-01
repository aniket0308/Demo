// import { createSlice } from '@reduxjs/toolkit'
// import { constants } from '../../common/constant'
// import { addCategoryWithSubCategories, getCategoryData } from '../../common/services'

// const initialState = {
//     categoriesData: [],
//     categoriesLoading: false,
//     categoriesError: ''
// }

// export const categoriesSlice = createSlice({
//     name: constants.Slice.CATEGORIES,
//     initialState,
//     reducers: {
//         getCategories: (state) => {
//             getCategoryData()
//             return { ...state, categoriesLoading: true }
//         },
//         addCategories: (state,action) => {
//             addCategoryWithSubCategories(action?.payload)
//             return { ...state, categoriesLoading: true }
//         },
//         getCategoriesSuccess: (state, action) => {
//             return { ...state, categoriesLoading: false, categoriesData: action.payload }
//         },
//         getCategoriesFailed: (state, action) => {
//             return { ...state, categoriesLoading: false, categoriesError: action.payload }
//         }

//     },
// })

// // Action creators are generated for each case reducer function
// export const { getCategories, getCategoriesSuccess, getCategoriesFailed, addCategories } = categoriesSlice.actions

// export default categoriesSlice.reducer