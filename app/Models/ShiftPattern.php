<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ShiftPattern extends Model
{
    public $timestamps = false;

    use SoftDeletes;

    protected function casts(): array {
    return [
        'start_time' => 'datetime:H:i',
        'end_time' => 'datetime:H:i',
    ];
}
}
