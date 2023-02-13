<?php

namespace App\Http\Controllers\Api;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\User;
use App\Models\Post;



class CommentController extends Controller
{

    public function storeComment(Request $request)
    {
        $user = Auth::user();
    
        $validateData = $request->validate([
            'body' => 'required|min:1',
            'post_id' => 'required|integer',
            'picture' => ['file', 'mimes:jpeg,png,gif', 'max:1072'],
        ]);
    
        $path = null;
        if ($request->hasFile('picture')) {
            $path = $request->file('picture')->storePublicly('commentImages');
        }
    
        $comment = Comment::create([
            'body' => $validateData['body'],
            'user_id' => $user->id,
            'post_id' => $validateData['post_id'],
            'picture' => $path
        ]);
    
        return response()->json([
            'comment' => $comment,
            'message' => 'Comment created successfully',
            'status' => 200
        ]);
    }
    


    

   

    public function updateComment(Request $request, $id){

$user = Auth::user();

$validatedData = $request->validate([
    'body' => 'required|min:1',
    'picture' => ['file', 'mimes:jpeg,png,gif', 'max:1072'],
]);

$comment = Comment::findOrFail($id);

$path = null;
if ($request->hasFile('picture')) {
    $path = $request->file('picture')->storePublicly('commentImages');
    Storage::delete($comment->picture);

   
}else{
    $path = $comment->picture;
}
$comment->update([
    'body' => $validatedData['body'],
    'picture' => $path,

]);
return response()->json([
    'comment' => $comment,
       'message' => 'Comment updated successfully',
]);

}

   

public function deleteComment($id)
{
    $comment = Comment::find($id);

    if (!$comment) {
        return response()->json([
            'message' => 'Comment not found',
            'status' => 404
        ]);
    }

    $post = $comment->post;

    if (Auth::user()->id !== $post->user_id) {
        return response()->json([
            'message' => 'You are not authorized to delete this comment',
            'status' => 403
        ]);
    }

    $comment->delete();

    return response()->json([
        'message' => 'Comment deleted successfully',
        'status' => 200
    ]);
}






}
