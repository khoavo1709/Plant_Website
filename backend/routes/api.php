<?php

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PurchaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    // Route::post('/logout', [AuthController::class, 'logout']);
    // Route::get('/user', function (Request $request) {
    //     return $request->user();
    // });

    // Route::apiResource('/users', UserController::class);
});

Route::resource('users', UserController::class);
Route::resource('products', ProductController::class);
Route::resource('categories', CategoryController::class);

Route::get('/purchases', [PurchaseController::class, 'index']);

Route::get('/purchases/dashboard', [PurchaseController::class, 'dashboard']);

Route::get('/purchases/{id}', [PurchaseController::class, 'show']);

Route::post('/purchases', [PurchaseController::class, 'store']);

Route::put('/purchases/{id}', [PurchaseController::class, 'update']);
