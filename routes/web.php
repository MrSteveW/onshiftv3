<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\StaffmemberController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\DutyController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


// Route::get('/', [StaffmemberController::class, 'board']);

Route::get('/board', [StaffmemberController::class, 'board']);

Route::resource('staff', StaffmemberController::class);
Route::resource('tasks', TaskController::class);
Route::resource('duties', DutyController::class);

require __DIR__.'/settings.php';
