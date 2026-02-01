<?php

namespace Database\Seeders;


use App\Models\Duty;
use Illuminate\Database\Seeder;

class DutySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         Duty::create([
            'staffmember_id' => 1,
            'task_id' => 4,
            'dutydate' => now()->format('Y-m-d'),
            ]);
    }
}