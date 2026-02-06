<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Employee;
use App\Enums\UserRole;

class EmployeePolicy
{
    public function before(User $user): bool|null
    {
        if ($user->role===UserRole::Admin) {
            return true;
        }
        return null;
    }

    public function viewAny(User $user): bool
    {
        return false;
    }
}
