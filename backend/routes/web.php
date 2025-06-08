<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
// use App\Http\Controllers\CashierController;


Route::get('/', function () {
    return view('welcome');
});

route::get('admin/dashboard', [AdminController::class, 'index'])->
    middleware(['auth','admin']);
// route::get('cashier/dashboard', [CashierController::class, 'index']);

Route::resource('categories', CategoryController::class);

