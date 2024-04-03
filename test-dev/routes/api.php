<?php

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ClienteController;
use App\Http\Controllers\Api\OrcamentoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get('/user', [UserController::class, 'index']);
Route::post('/user', [UserController::class, 'store']);

Route::get('/cliente', [ClienteController::class, 'index']);
Route::get('/cliente/{id}', [ClienteController::class, 'show']);
Route::post('/cliente', [ClienteController::class, 'store']);
Route::delete('/cliente/{id}', [ClienteController::class, 'destroy']);

Route::get('/orcamento', [OrcamentoController::class, 'index']);
Route::get('/orcamento/{id}', [OrcamentoController::class, 'show']);
Route::post('/orcamento', [OrcamentoController::class, 'store']);
Route::delete('/orcamento/{id}', [OrcamentoController::class, 'destroy']);
