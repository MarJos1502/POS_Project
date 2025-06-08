<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::apiResource('categories', CategoryController::class);
