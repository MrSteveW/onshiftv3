<?php

namespace Database\Seeders;

use App\Models\Employee;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    public function run(): void
    {
        Employee::create([
            'user_id' => 1,
            'grade_id' => 4,
            'date_started' => now()->format('Y-m-d'),
            'training' => 'JavaScript, PHP',
            ]);

             Employee::create([
            'user_id' => 2,
            'grade_id' => 3,
            'date_started' => now()->format('Y-m-d'),
            'training' => 'Pipette training',
            ]);
       
    }
}
