<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Post;
use App\Models\Categories;



class CategoriesController extends Controller
{
    public function createCategory(Request $request){
        $user = Auth::user();

        $validateData = $request->validate([
            'name' => 'required|max:255',


        ]);

        $categories = $user->categories()->create($validateData);


        return response()->json([
            'status'=>200
        ]);
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
