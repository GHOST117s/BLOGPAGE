<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\PostController;


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

Route::middleware(['auth:api'])->group(function(){
    Route::post('/logout',[UserController::class,'logout']);

    Route::post('/post',[PostController::class,'createPost']);

    Route::get('/user/{id}',[UserController::class,'getUser']);

    Route::get('/edit/{id}',[PostController::class,'edit']);

    Route::post('/update/{id}',[PostController::class,'updatePost']);

    Route::put('/delete/{id}',[PostController::class,'deletePost']);

    
});