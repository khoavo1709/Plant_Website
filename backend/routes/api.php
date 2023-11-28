<?php

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/health_check', function () {
    return response()->json(["message" => "ok"]);
});

Route::resource('products', ProductController::class);

Route::resource('categories', CategoryController::class);

Route::get('/purchases', [PurchaseController::class, 'index']);

Route::get('/purchases/dashboard', [PurchaseController::class, 'dashboard']);

Route::get('/purchases/{id}', [PurchaseController::class, 'show']);

Route::post('/purchases', [PurchaseController::class, 'store']);

Route::post('/purchases/{id}', [PurchaseController::class, 'update']);
