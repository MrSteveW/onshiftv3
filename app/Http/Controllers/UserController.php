<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Resources\UserResource;
use Inertia\Inertia;

class UserController extends Controller
{
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

        return Inertia::render('Home', [
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
        return Inertia::render('Users/Create');
    }

    public function store()
    {
        request()->validate([
            'name'=>['required'],
            'grade'=>['required']
        ]);

        User::create([
            'name' => request('name'),
            'grade' => request('grade'),
        ]);
        return redirect('/users');
    }


    public function show(User $user)
{
    return Inertia::render('Users/Show', [
        'user' => $user
    ]);
}

    public function edit(User $user)
    {
         return Inertia::render('Users/Edit', [
         'user' => new UserResource($user)
        ]);
    }

    public function update(User $user)
    {
        request()->validate([
            'name'=>['required'],
            'grade'=>['required']
        ]);

        $user->update([
            'name' => request('name'),
            'grade' => request('grade'),
        ]);
        
        return redirect('users/'.$user->id);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect('/users');
    }
}