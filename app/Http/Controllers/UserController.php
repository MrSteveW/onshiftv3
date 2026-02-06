<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Employee;
use App\Http\Resources\UserResource;
use Inertia\Inertia;
use App\Enums\UserRole;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    // Authorization
    public static function middleware(): array
    {
        return [
            new Middleware('can:viewAny,App\Models\User'),
        ];
    }

    public function board()
    {
        // Get all users and convert them to duties for the drag-and-drop board
        $users = User::all();
        
        $duties = $users->map(function ($user) {
            return [
                'id' => $user->id,
                'user_id' => $user->id,
                'task_id' => null, // No task assigned initially
                'shift_type' => null,
                'hours' => null,
                'analyser_id' => null, // All start as unassigned
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'grade' => $user->grade,
                ],
                'task' => null,
            ];
        });

        return Inertia::render('Dashboard', [
            'duties' => $duties
        ]);
    }
    public function index()
    {
         return Inertia::render('Users/Index', [
         'users' => UserResource::collection(User::all())
        ]);
    }

    public function create()
    {
        return Inertia::render('Users/Create', [
        'roles' => array_column(UserRole::cases(), 'value'),
        ]);;
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'=>['required', 'string', 'max:255'],
            'email'=>['required', 'email', 'unique:users'],
            'password'=>['required'],
            'role'=>['required', Rule::enum(UserRole::class)],
            'grade'=>['required'],
            'training'=>['nullable', 'string'],
        ]);

        DB::transaction(function () use ($validated) {
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'role' => $validated['role'],
                'password' => $validated['password'],
            ]);

            $user->employee()->create([
                'grade' => $validated['grade'],
                'training' => $validated['training'],
            ]);
        });
        
        return redirect('/users')->with('message', 'User created successfully.');
    }

    public function edit(User $user)
    {
         return Inertia::render('Users/Edit', [
         'user' => new UserResource($user),
          'roles' => array_column(UserRole::cases(), 'value'),
        ]);
    }

    public function update(User $user)
    {
        request()->validate([
            'name'=>['required', 'string', 'max:255'],
            'email'=>[
                'required',
                'email', 
                Rule::unique('users')->ignore($user->id)],
            'grade'=>['required'],
            'role'=>['required', Rule::enum(UserRole::class)],
        ]);

        $user->update(request()->all());
        
        return redirect('/users');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect('/users');
    }
}