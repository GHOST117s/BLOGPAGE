<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Post;
use App\Models\Categories;
use Illuminate\Support\Facades\Validator;




class CategoriesController extends Controller
{
    public function createCategory(Request $request)
    {
        $user = Auth::user();
    
        $validatedData = $request->validate([
            'name' => 'required|max:255|unique:categories,name',
        ]);
    
        $validatedData['name'] = strtolower($validatedData['name']); // convert name to lowercase
    
        // If the user-provided name is not unique due to case-insensitivity,
        // we need to overwrite the validation error message to avoid duplicate errors
        
        $validator = Validator::make($validatedData, [
            'name' => 'unique:categories,name'
        ]);
        $validator->sometimes('name', 'unique:categories,name', function ($input) {
            return strtolower($input->name) !== $input->name;
        });
    
        // If validation fails, return the error messages as JSON response
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    
        $category = $user->categories()->create($validatedData);
    
        return response()->json(['status' => 200]);
    }
    

    public function getAllCategoriesWithPosts()
    {
        $categories = Categories::with('post')->get();

        return response()->json([
            'categories' => $categories,
            'status' => 200
        ]);
    }

    public function deleteCategory(Request $request, $id)
    {
        $categories = Categories::findOrFail($id);
    
        // Check if authenticated user is the owner of the categories
        if ($categories->user_id !== auth()->user()->id) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        }
    
        $categories->delete();
    
        return response()->json([
            'message' => 'categories deleted successfully',
        ], 200);
    }


    public function getCategory($id)
{
    $categories = Categories::with('post.user','user')->find($id);

    if (! $categories) {
        return response()->json([
            'message' => 'Category not found',
            'status' => 404
        ], 404);
    }

    return response()->json([
        'category' =>  $categories,
        'status' => 200
    ]);
}






    //
}
