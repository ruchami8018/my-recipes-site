import { makeAutoObservable, runInAction } from "mobx"
import axios from "axios"
import { RecipeType } from "../models/Recipe"

class RecipesStore {
    authorId!:string 
    list: RecipeType[] = []
    private apiEndpoint = 'http://localhost:3000/api/recipes';

    constructor() {
        makeAutoObservable(this)
    }

    setAuthorId(id:string)
    {
        this.authorId=id
    }

    async getAllRecipes() {
        try {
            const response = await axios.get<RecipeType[]>(this.apiEndpoint);
            runInAction(() => {
                this.list = response.data;
            });
        } catch (error) {
            console.error('Error fetching recipes:', error);
            
            // Add more detailed error handling
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    console.error('Server responded with:', error.response.data);
                    console.error('Status code:', error.response.status);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error('No response received');
                } else {
                    // Something happened in setting up the request
                    console.error('Error setting up request');
                }
            }
            
            throw error;
        }
    }

    async getRecipeById(recipeId: string) {
        if (this.list.length === 0) {
            await this.getAllRecipes();
        }
        const recipe = this.list.find(r => r.id.toString() === recipeId);
        if (!recipe) {
            console.error('Recipe not found. Details:', {
                searchId: recipeId,
                recipeIds: this.list.map(r => r.id),
                recipeCount: this.list.length
            });
            throw new Error(`מתכון עם מזהה ${recipeId} לא נמצא`);
        }
        return recipe;
    }

    async addRecipe(recipe: Partial<RecipeType>) {
        try {
            const response = await axios.post<RecipeType>(this.apiEndpoint, recipe);
            runInAction(() => {
                this.list.push(response.data);
            });
        } catch (error) {
            console.error('Error adding recipe:', error);
            throw error;
        }
    }
}

export default new RecipesStore()