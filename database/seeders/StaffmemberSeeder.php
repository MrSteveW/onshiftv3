<?php

namespace Database\Seeders;

use App\Models\Staffmember;
use Illuminate\Database\Seeder;

class StaffmemberSeeder extends Seeder
{
    public function run(): void
    {
        Staffmember::create([
            'name' => 'Steve',
            'role' => 'BMS5',
            'date_started' => now()->format('Y-m-d'),
            ]);

        Staffmember::create([
            'name' => 'Simon',
            'role' => 'BMS7',
            'date_started' => now()->format('Y-m-d'),
            ]);

         Staffmember::create([
            'name' => 'Sophie',
            'role' => 'Bank',
            'date_started' => now()->format('Y-m-d'),
            ]);

         Staffmember::create([
            'name' => 'Sam',
            'role' => 'Intern',
            'date_started' => now()->format('Y-m-d'),
            ]);
    }
}