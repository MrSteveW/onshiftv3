<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Duty extends Model
{
    // set custom table name
    protected $table = 'task_user_duty';

    protected $fillable = ['user_id', 'task_id', 'dutydate', 'shift_type', 'hours'];

    public $timestamps = false;

    public function user()
    {
        return $this->belongsTo(User::class)->withTrashed();
    }

    public function task()
    {
        return $this->belongsTo(Task::class)->withTrashed();
    }

}