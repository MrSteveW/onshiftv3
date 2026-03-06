<?php

namespace Database\Seeders;

use App\Models\ShiftPattern;
use Illuminate\Database\Seeder;
use App\Enums\ShiftType;

class ShiftPatternSeeder extends Seeder
{

    public function run(): void
    {
       ShiftPattern::create([
            'user_id' => 1,
            'day' => 1,
            'shift_type' => ShiftType::OnDuty,
            'start_time' => '19:30',
            'end_time' => '08:00',
            ]);
        ShiftPattern::create([
            'user_id' => 1,
            'day' => 2,
            'shift_type' => ShiftType::OnDuty,
            'start_time' => '19:30',
            'end_time' => '08:00',
            ]);
        ShiftPattern::create([
            'user_id' => 1,
            'day' => 3,
            'shift_type' => ShiftType::OnDuty,
            'start_time' => '19:30',
            'end_time' => '08:00',
            ]);
         ShiftPattern::create([
            'user_id' => 1,
            'day' => 4,
            'shift_type' => ShiftType::Off,
            ]);
        ShiftPattern::create([
            'user_id' => 1,
            'day' => 5,
            'shift_type' => ShiftType::Off,
            ]);


        ShiftPattern::create([
            'user_id' => 2,
            'day' => 1,
            'shift_type' => ShiftType::Off,
            ]);
        ShiftPattern::create([
            'user_id' => 2,
            'day' => 2,
            'shift_type' => ShiftType::Off,
            ]);
        ShiftPattern::create([
            'user_id' => 2,
            'day' => 3,
            'shift_type' => ShiftType::OnDuty,
            'start_time' => '08:00',
            'end_time' => '20:00',
            ]);
         ShiftPattern::create([
            'user_id' => 2,
            'day' => 4,
            'shift_type' => ShiftType::OnDuty,
            'start_time' => '19:30',
            'end_time' => '08:00',
            ]);
         ShiftPattern::create([
            'user_id' => 2,
            'day' => 5,
            'shift_type' => ShiftType::OnDuty,
            'start_time' => '19:30',
            'end_time' => '08:00',
            ]);

        
         ShiftPattern::create([
            'user_id' => 3,
            'day' => 1,
            'shift_type' => ShiftType::Off,
            ]);
        ShiftPattern::create([
            'user_id' => 3,
            'day' => 2,
            'shift_type' => ShiftType::Off,
            ]);
        ShiftPattern::create([
            'user_id' => 3,
            'day' => 3,
            'shift_type' => ShiftType::Off,
            ]);
         ShiftPattern::create([
            'user_id' => 3,
            'day' => 4,
            'shift_type' => ShiftType::OnDuty,
            'start_time' => '07:45',
            'end_time' => '15:45',
            ]);
         ShiftPattern::create([
            'user_id' => 3,
            'day' => 5,
            'shift_type' => ShiftType::OnDuty,
            'start_time' => '07:45',
            'end_time' => '15:45',
            ]);
    }
}
