<?php

namespace App\Http\Controllers;

use App\Models\Duty;
use App\Models\User;
use App\Models\Task;
use App\Http\Resources\DutyResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\TaskResource;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Carbon\Carbon;

class DutyController extends Controller
{
    public function index(Request $request): Response|JsonResponse|InertiaResponse
    {
        if ($request->expectsJson()) {
            $request->validate([
                'start' => ['required', 'date'],
                'end'   => ['required', 'date'],
            ]);
            $start = Carbon::parse($request->start)->toDateString();
            $end   = Carbon::parse($request->end)->toDateString();

            $duties = Duty::with('user')
                ->whereBetween('date', [$start, $end])
                ->get()
                ->map(fn (Duty $duty) => [
                    'id'    => $duty->id,
                    'title' => $duty->user->name,
                    'start' => $duty->date . 'T' . $duty->start_time,
                    'end'   => $duty->end_time < $duty->start_time
                        ? $duty->date . 'T23:59:00'
                        : $duty->date . 'T' . $duty->end_time,
                    'extendedProps' => [
                        'shift_type' => $duty->shift_type,
                         'start_time' => $duty->start_time,
                        'end_time'   => $duty->end_time,
                        'grade' => $duty->user->employee->grade->name
                    ],
                ]);

            return response()->json($duties);
        }

        return Inertia::render('Duties/Index');
    }


    public function create()
    {
        $users = User::with('employee.grade')->get();
        return Inertia::render('Duties/Create', [
            'users' => $users->map(fn($user) => [
                'id'    => $user->id,
                'name'  => $user->name,
                'grade' => $user->employee->grade->name ?? '',
            ]),
            'tasks' => TaskResource::collection(Task::all())
        ]);
    }

    public function store()
    {
    // Validate that we receive an array of duties
    request()->validate([
        'duties' => ['required', 'array'],
        'duties.*.user_id' => ['required', 'integer'],
        'duties.*.task_id' => ['required', 'integer'], 
        'duties.*.dutydate' => ['required', 'date_format:Y-m-d'],
    ]);

    // Create multiple duties at once
    $duties = request('duties');
    foreach ($duties as $dutyData) {
        Duty::create([
            'user_id' => $dutyData['user_id'],
            'task_id' => $dutyData['task_id'],
            'dutydate' => $dutyData['dutydate'],
            'shift_type' => $dutyData['shift_type'] ?? null,
            'hours' => $dutyData['hours'] ?? null,
        ]);
    }
    
    return redirect('/duties');
}

    // public function show(Duty $duty)
    // {
    //     return view('duties.show', ['duty' => $duty]);
    // }

    // public function edit(Duty $duty)
    // {
    //     return view('duties.edit', [
    //         'duty' => $duty,
    //         'users' => User::all(),
    //         'tasks' => Task::all(),
    //     ]);
    // }

    public function update(Duty $duty)
    {
        request()->validate([
        'user_id'=>['required'],
        'task_id'=>['required'],
        'dutydate'=>['required'],
        ]);

        $duty->update([
            'user_id' => request('user_id'),
            'task_id' => request('task_id'),
            'dutydate' => request('dutydate')
        ]);
        return redirect('duties/'.$duty->id);
    }

    public function destroy(Duty $duty)
    {
        $duty->delete();
        return redirect('/duties');
    }
}