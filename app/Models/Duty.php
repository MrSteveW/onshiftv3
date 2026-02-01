<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Duty extends Model
{
    // set custom table name
    protected $table = 'staff__task_duty';

    protected $fillable = ['staffmember_id', 'task_id', 'dutydate', 'shift_type', 'hours'];

    public $timestamps = false;

    public function staffmember()
    {
        return $this->belongsTo(Staffmember::class)->withTrashed();
    }

    public function task()
    {
        return $this->belongsTo(Task::class)->withTrashed();
    }

}