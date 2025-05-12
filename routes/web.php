<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('tasks', [TaskController::class, 'index'])->name('tasks.index');

    Route::get('tasks/create', [TaskController::class, 'create'])->name('tasks.create');
    Route::post('tasks/create', [TaskController::class, 'store'])->name('tasks.store');

    Route::get('tasks/{task}/edit', [TaskController::class, 'edit'])->name('tasks.edit');
    Route::put('tasks/{task}/edit', [TaskController::class, 'update'])->name('tasks.update');
    Route::patch('tasks/{task}/updateState', [TaskController::class, 'updateState'])->name('tasks.updateState')
        ->middleware('can:update,task');

    Route::delete('tasks/{task}/destroy', [TaskController::class, 'destroy'])->name('tasks.destroy')
        ->middleware('can:delete,task');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
