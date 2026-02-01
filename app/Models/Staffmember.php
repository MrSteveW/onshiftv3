<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Staffmember extends Model
{
    protected $table = 'staff';

    protected $fillable = ['name', 'role', 'date_started', 'date_ended'];

    public $timestamps = false;

    use SoftDeletes;
}