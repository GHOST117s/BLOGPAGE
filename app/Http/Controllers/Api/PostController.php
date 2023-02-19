<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use App\Models\Post;



class PostController extends Controller
{

    public function createPost(Request $request){
        $user = Auth::user();

        $validateData = $request->validate([
            'title' =>'required|min:3',
            'content' =>'required|min:3',
            'categories_id'=>['required', 'integer'],
             'picture' =>['file','mimes:jpeg,png,gif','max:3072'],
        ]);

        $path = null;
        if($request->hasFile('picture')){
            $path = $request->file('picture')->storePublicly('postImages');
        }

        $post = $user->post()->create($validateData);
   
        return response()->json([
            // 'user ' => $user,
            'post' => $post,
            'status'=> 200
        ]);


}

public function edit($id){
    $user = Auth::user();

    $post = $user->post()->find($id);

    return response()->json([
      
        'post' => $post,
       'status'=> 200
    ]);
}

public function updatePost(Request $request, $id)
{
    $user = Auth::user();
    $post = $user->post()->find($id);

    // Check if the user is authorized to update the post
    if (!$post) {
        return response()->json([
            'message' => 'Unauthorized',
            'status' => 401,
        ], 401);
    }
    
    // Validate request data
    $validatedData = $request->validate([
        'title' => 'required|min:3',
        'content' => 'required|min:3',
        'categories_id'=>['required', 'integer'],
        'picture' => ['file', 'mimes:jpeg,png,gif', 'max:3072'],
    ]);

    if ($user->id !== $post->user_id) {
        return response()->json([
            'message' => 'You are not authorized to update this post.',
            'status' => 403,
        ]);
    }
    // Check if a new picture was provided
    $path = null;
    if ($request->hasFile('picture')) {
        // Upload the new picture
        $path = $request->file('picture')->storePublicly('postImages');

        // Delete the old picture
        Storage::delete($post->picture);
    } else {
        // Keep the old picture
        $path = $post->picture;
    }

    // Update the post with the new data
    $post->update([
        'title' => $validatedData['title'],
        'content' => $validatedData['content'],
        'picture' => $path,
    ]);

    // Return a response with the updated post
    return response()->json([
        'post' => $post,
        'status' => 200,
    ]);
}

public function deletePost(Request $request, $id)
{
    $user = Auth::user();
    $post = Post::find($id);

    // Check if the authenticated user is the owner of the post
    if ($user->id !== $post->user_id) {
        return response()->json([
            'message' => 'You are not authorized to delete this post.',
            'status' => 403,
        ]);
    }
    $post->comments()->delete();
    // Delete the post and its picture
    if ($post->picture !== null) {
        Storage::delete($post->picture);
    }
    
    $post->delete();
    

    // Return a response indicating success
    return response()->json([
        'message' => 'Post deleted successfully.',
        'status' => 200,
    ]);
}

public function getPosts(Request $request, $id)
{
    $post = Post::with('comments.user')->find($id);

    if (!$post) {
        return response()->json([
            'message' => 'Post not found',
            'status' => 404,
        ], 404);
    }

    return response()->json([
        'post' => $post,
        'status' => 200,
    ]);
}




}