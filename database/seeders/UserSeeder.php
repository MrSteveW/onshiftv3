<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       User::create([
            'name' => 'Steve',
            'email' => 'steve@example.com',
            'password' => 'password',
            'grade' => 'BMS5',
            'date_started' => now()->format('Y-m-d'),
            ]);

        User::create([
            'name' => 'Simon',
            'email' => 'simon@example.com',
            'password' => 'password',
            'grade' => 'BMS7',
            'date_started' => now()->format('Y-m-d'),
            ]);

         User::create([
            'name' => 'Sophie',
            'email' => 'sophie@example.com',
            'password' => 'password',
            'grade' => 'Bank',
            'date_started' => now()->format('Y-m-d'),
            ]);

         User::create([
            'name' => 'Sam',
            'email' => 'sam@example.com',
            'password' => 'password',
            'grade' => 'Intern',
            'date_started' => now()->format('Y-m-d'),
            ]);
    }
}
