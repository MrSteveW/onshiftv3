<?php

namespace Database\Seeders;

use App\Models\ShiftPattern;
use Illuminate\Database\Seeder;
use App\Enums\ShiftStatus;

class ShiftPatternSeeder extends Seeder
{

    public function run(): void
    {
       ShiftPattern::create([
            'user_id' => 1,
            'day_number' => 1,
            'status' => ShiftStatus::OnDuty,
            'start_time' => '08:00',
            'end_time' => '16:00',
            ]);
    }
}
