<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\DutyController;

Route::get('/', function () {
     if (Auth::check()) {
        return redirect()->route('dashboard');
     }
        return Inertia::render('welcome', [
        'status' => session('status'),
        'canResetPassword' => Route::has('password.request'),
    ]);
})->name('home');


// Route::get('/EXAMPLE', function () {...
// })->middleware(['verified']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
    return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('tasks', TaskController::class);
    Route::resource('duties', DutyController::class);

});


Route::resource('users', UserController::class)->except(['show']);
Route::get('users/{user}', function () {
    return redirect()->route('users.index');
});

Route::get('/board', [UserController::class, 'board']);



require __DIR__.'/settings.php';
