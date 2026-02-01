<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DutyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'staffmember_id' => $this->staffmember_id,
            'task_id' => $this->task_id,
            'dutydate' => $this->dutydate,
            'shift_type' => $this->shift_type,
            'hours' => $this->hours,
            'staffmember' => new StaffmemberResource($this->whenLoaded('staffmember')),
            'task' => new TaskResource($this->whenLoaded('task')),
        ];
    }
}