<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PurchaseController;
use App\Http\Middleware\AdminRequired;
use App\Http\Middleware\Authen;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

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

Route::post('/login', [AuthController::class, 'login']);

Route::get('/users/me', function (Request $request) {
    $user = $request->user;
    return response()->json($user);
})->middleware(Authen::class);

Route::get('/users',  [UserController::class, 'index'])->middleware(Authen::class)->middleware(AdminRequired::class);
Route::get('/users/{id}',  [UserController::class, 'show'])->middleware(Authen::class)->middleware(AdminRequired::class);
Route::post('/users',  [UserController::class, 'store'])->middleware(Authen::class)->middleware(AdminRequired::class);
Route::put('/users/{id}',  [UserController::class, 'update'])->middleware(Authen::class)->middleware(AdminRequired::class);
Route::delete('/users',  [UserController::class, 'destroy'])->middleware(Authen::class)->middleware(AdminRequired::class);

Route::put('/products/{id}', [ProductController::class, 'update'])->middleware(Authen::class);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::post('/products', [ProductController::class, 'store'])->middleware(Authen::class);
Route::delete('/products/{id}', [ProductController::class, 'destroy'])->middleware(Authen::class);

Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories', [CategoryController::class, 'store'])->middleware(Authen::class);
Route::put('/categories/{id}', [CategoryController::class, 'update'])->middleware(Authen::class);
Route::get('/categories/{id}', [CategoryController::class, 'show']);
Route::delete('/categories/{id}', [CategoryController::class, 'destroy'])->middleware(Authen::class);

Route::get('/purchases', [PurchaseController::class, 'index'])->middleware(Authen::class);
Route::get('/purchases/dashboard', [PurchaseController::class, 'dashboard'])->middleware(Authen::class);
Route::get('/purchases/{id}', [PurchaseController::class, 'show'])->middleware(Authen::class);
Route::post('/purchases', [PurchaseController::class, 'store']);
Route::put('/purchases/{id}', [PurchaseController::class, 'update'])->middleware(Authen::class);
