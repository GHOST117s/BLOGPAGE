<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\CategoriesController;




/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/register',[UserController::class,'register']);
Route::post('/login',[UserController::class,'login']);
Route::get('/getAllcategories',[CategoriesController::class,'getAllCategoriesWithPosts']);

Route::middleware(['auth:api'])->group(function(){
    Route::post('/logout',[UserController::class,'logout']);

    Route::get('/user',[UserController::class,'getUser']);
    
    Route::post('/post',[PostController::class,'createPost']);

    Route::get('/edit/{id}',[PostController::class,'edit']);

    Route::post('/update/{id}',[PostController::class,'updatePost']);

    Route::put('/delete/{id}',[PostController::class,'deletePost']);

    Route::post('/store-comment', [CommentController::class,'storeComment']);

    Route::post('/comment-update/{id}', [CommentController::class,'updateComment']);


    Route::put('/deletecomment/{id}',[CommentController::class,'deleteComment']);


    Route::post('/categories',[CategoriesController::class,'createCategory']);

    Route::get('/getPost/{id}',[PostController::class,'getPosts']);




});