<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use App\Enums\UserRole;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => 'password',
            'grade' => '',
            'role' => UserRole::Admin,
            'date_started' => now()->format('Y-m-d'),
            ]);

        User::create([
            'name' => 'Admin2',
            'email' => 'Admin2@example.com',
            'password' => 'password',
            'grade' => 'BMS7',
            'role' => UserRole::Admin,
            'date_started' => now()->format('Y-m-d'),
            ]);

         User::create([
            'name' => 'Editor',
            'email' => 'editor@example.com',
            'password' => 'password',
            'grade' => 'Bank',
            'role' => UserRole::Editor,
            'date_started' => now()->format('Y-m-d'),
            ]);

         User::create([
            'name' => 'View',
            'email' => 'viewer@example.com',
            'password' => 'password',
            'grade' => 'Intern',
            'role' => UserRole::Viewer,
            'date_started' => now()->format('Y-m-d'),
            ]);
    }
}
