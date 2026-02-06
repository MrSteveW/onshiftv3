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
            'grade' => 'Senior',
            'date_started' => now()->format('Y-m-d'),
            'training' => 'JavaScript, PHP',
            ]);
       
    }
}
