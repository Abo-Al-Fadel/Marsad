<?php

namespace App\Http\Controllers;

use App\Models\Incident;
use Illuminate\Http\Request;

class IncidentController extends Controller
{
    // List all incidents, supports filtering by location, type, status, and free-text search
    public function index(Request $request)
    {
        $query = Incident::query()->orderBy('time', 'desc');

        if ($request->filled('location')) {
            $query->where('location', $request->location);
        }

        if ($request->filled('type')) {
            $query->where('type', 'LIKE', '%' . $request->type . '%');
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'LIKE', "%{$search}%")
                  ->orWhere('location', 'LIKE', "%{$search}%")
                  ->orWhere('type', 'LIKE', "%{$search}%")
                  ->orWhere('note', 'LIKE', "%{$search}%");
            });
        }

        return response()->json($query->get());
    }

    // Create a new incident report (requires authentication)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'location' => 'required|string|max:255',
            'type'     => 'required|string|max:100',
            'time'     => 'required|date',
            'note'     => 'nullable|string|max:2000',
        ]);

        $title = $validated['type'] . ' reported in ' . $validated['location'];

        $incident = Incident::create([
            'user_id'  => $request->user()->id,
            'title'    => $title,
            'location' => $validated['location'],
            'type'     => $validated['type'],
            'time'     => $validated['time'],
            'status'   => 'Unverified',
            'note'     => $validated['note'] ?? null,
            'confirms' => 0,
            'rejects'  => 0,
        ]);

        return response()->json([
            'message'  => 'Incident reported successfully.',
            'incident' => $incident,
        ], 201);
    }

    // Get a single incident by its ID
    public function show($id)
    {
        return response()->json(Incident::findOrFail($id));
    }

    // Return aggregate stats: total, verified, unverified, rejected counts
    public function stats()
    {
        return response()->json([
            'total'      => Incident::count(),
            'verified'   => Incident::where('status', 'Verified')->count(),
            'unverified' => Incident::where('status', 'Unverified')->count(),
            'rejected'   => Incident::where('status', 'Rejected')->count(),
        ]);
    }
}
