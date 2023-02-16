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



    //
}
