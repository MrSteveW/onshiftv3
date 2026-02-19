<?php

namespace App\Http\Controllers;

use App\Models\ShiftPattern;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShiftPatternController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('ShiftPatterns/Index', [
            'shiftpatterns' => ShiftPattern::all(),
         ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ShiftPattern $shiftPattern)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ShiftPattern $shiftPattern)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ShiftPattern $shiftPattern)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ShiftPattern $shiftPattern)
    {
        //
    }
}
