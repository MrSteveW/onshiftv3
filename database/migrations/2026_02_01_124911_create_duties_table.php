<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('staff__task_duty', function (Blueprint $table) {
            $table->id();
            $table->foreignId('staffmember_id')->constrained('staff');
            $table->foreignId('task_id')->constrained('tasks');
            $table->date('dutydate');
            $table->string('shift_type')->nullable();
            $table->decimal('hours', 3, 1)->nullable();
            
            // Prevent duplicate assignments
            $table->unique(['staffmember_id', 'task_id', 'dutydate']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('staff__task_duty');
    }
};