<?php

namespace Database\Seeders;

use App\Models\ShiftRepeat;
use Illuminate\Database\Seeder;

class ShiftRepeatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ShiftRepeat::create([
            'total_days' => 91,
            ]);
    }
}
