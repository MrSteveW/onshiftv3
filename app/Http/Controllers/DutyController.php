<?php

namespace App\Http\Controllers;

use App\Models\Duty;
use App\Models\Staffmember;
use App\Models\Task;
use App\Http\Resources\DutyResource;
use App\Http\Resources\StaffmemberResource;
use App\Http\Resources\TaskResource;
use Inertia\Inertia;


class DutyController extends Controller
{
    public function index()
    {
        $selectedDate = request()->query('date');
        
        // Always get all tasks
        $tasks = Task::all();

        if ($selectedDate) {
            $validatedData = request()->validate([
            'date' => ['required', 'date_format:Y-m-d']
            ]);

             $duties = Duty::with(['staffmember', 'task'])
            ->whereDate('dutydate', $validatedData['date'])
            ->get();
        } else {
            $duties = collect();
        }
        return Inertia::render('Duties/Index', [
            'tasks' => TaskResource::collection($tasks),
            'duties' => DutyResource::collection($duties),
            'selectedDate' => $selectedDate ?? null
         ]);
    }


    public function create()
    {
         return Inertia::render('Duties/Create' ,[
               'staff' => StaffmemberResource::collection(Staffmember::all()),
               'tasks' => TaskResource::collection(Task::all())
        ]);
    }

    public function store()
    {
    // Validate that we receive an array of duties
    request()->validate([
        'duties' => ['required', 'array'],
        'duties.*.staffmember_id' => ['required', 'integer'],
        'duties.*.task_id' => ['required', 'integer'], 
        'duties.*.dutydate' => ['required', 'date'],
    ]);

    // Create multiple duties at once
    $duties = request('duties');
    foreach ($duties as $dutyData) {
        Duty::create([
            'staffmember_id' => $dutyData['staffmember_id'],
            'task_id' => $dutyData['task_id'],
            'dutydate' => $dutyData['dutydate'],
            'shift_type' => $dutyData['shift_type'] ?? null,
            'hours' => $dutyData['hours'] ?? null,
        ]);
    }
    
    return redirect('/duties');
}

    public function show(Duty $duty)
    {
        return view('duties.show', ['duty' => $duty]);
    }

    public function edit(Duty $duty)
    {
        return view('duties.edit', [
            'duty' => $duty,
            'staff' => Staffmember::all(),
            'tasks' => Task::all(),
        ]);
    }

    public function update(Duty $duty)
    {
        request()->validate([
        'staffmember_id'=>['required'],
        'task_id'=>['required'],
        'dutydate'=>['required'],
        ]);

        $duty->update([
            'staffmember_id' => request('staff_id'),
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