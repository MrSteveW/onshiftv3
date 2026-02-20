<?php

namespace App\Http\Controllers;

use App\Models\ShiftPattern;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Resources\ShiftPatternResource;
use App\Models\ShiftRepeat;
use Illuminate\Support\Carbon;

class ShiftPatternController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $shiftpatterns = ShiftPattern::with('user')->get();
        $shiftRepeat = ShiftRepeat::first();
        $totalDays = $shiftRepeat?->total_days ?? 7; 
        $days = collect(range(1, $totalDays))->map(function ($number) {
        return [
            'number' => $number,
            'name' => Carbon::create()->startOfWeek()->addDays(($number - 1) % 7)->dayName
        ];
    });

        return Inertia::render('ShiftPatterns/Index', [
            'shiftpatterns' =>  ShiftPatternResource::collection($shiftpatterns),
            'days' => $days,
         ]);
    }

    public function create()
    {
        
    }


    public function store(Request $request)
    {
        
    }


    public function show(ShiftPattern $shiftPattern)
    {
        
    }


    public function edit(ShiftPattern $shiftPattern)
    {
        
    }


    public function update(Request $request, ShiftPattern $shiftPattern)
    {
        
    }


    public function destroy(ShiftPattern $shiftPattern)
    {
        
    }
}
