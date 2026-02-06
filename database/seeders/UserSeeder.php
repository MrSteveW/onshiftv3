<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use App\Enums\UserRole;

class UserSeeder extends Seeder
{
    public function run(): void
    {
       User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => 'password',
            'role' => UserRole::Admin,
            ]);

        User::create([
            'name' => 'Admin2',
            'email' => 'Admin2@example.com',
            'password' => 'password',
            'role' => UserRole::Admin,
            ]);

         User::create([
            'name' => 'Editor',
            'email' => 'editor@example.com',
            'password' => 'password',
            'role' => UserRole::Editor,
            ]);

         User::create([
            'name' => 'View',
            'email' => 'viewer@example.com',
            'password' => 'password',
            'role' => UserRole::Viewer,
            ]);
    }
}
