<?php

namespace App\Http\Controllers;

use App\Models\Incident;
use App\Models\Vote;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    // Cast, switch, or remove a vote on an incident (toggle logic)
    public function vote(Request $request, $incidentId)
    {
        $request->validate([
            'action' => 'required|in:confirm,reject',
        ]);

        $incident = Incident::findOrFail($incidentId);
        $user     = $request->user();
        $action   = $request->action;

        $existingVote = Vote::where('user_id', $user->id)
            ->where('incident_id', $incident->id)
            ->first();

        if ($existingVote) {
            if ($existingVote->action === $action) {
                // Same action clicked again → undo (remove the vote)
                if ($action === 'confirm') {
                    $incident->confirms = max(0, $incident->confirms - 1);
                } else {
                    $incident->rejects = max(0, $incident->rejects - 1);
                }
                $existingVote->delete();
                $incident->save();
                $incident->recalculateStatus();

                return response()->json([
                    'message'  => 'Vote removed.',
                    'vote'     => null,
                    'confirms' => $incident->confirms,
                    'rejects'  => $incident->rejects,
                    'status'   => $incident->status,
                ]);
            } else {
                // Different action → switch vote (e.g., confirm→reject)
                if ($existingVote->action === 'confirm') {
                    $incident->confirms = max(0, $incident->confirms - 1);
                } else {
                    $incident->rejects = max(0, $incident->rejects - 1);
                }

                $existingVote->action = $action;
                $existingVote->save();

                if ($action === 'confirm') {
                    $incident->confirms++;
                } else {
                    $incident->rejects++;
                }

                $incident->save();
                $incident->recalculateStatus();

                return response()->json([
                    'message'  => 'Vote updated.',
                    'vote'     => $action,
                    'confirms' => $incident->confirms,
                    'rejects'  => $incident->rejects,
                    'status'   => $incident->status,
                ]);
            }
        }

        // First time voting on this incident → create new vote record
        Vote::create([
            'user_id'     => $user->id,
            'incident_id' => $incident->id,
            'action'      => $action,
        ]);

        if ($action === 'confirm') {
            $incident->confirms++;
        } else {
            $incident->rejects++;
        }

        $incident->save();
        $incident->recalculateStatus();

        return response()->json([
            'message'  => 'Vote recorded.',
            'vote'     => $action,
            'confirms' => $incident->confirms,
            'rejects'  => $incident->rejects,
            'status'   => $incident->status,
        ]);
    }

    // Get the current user's vote on a specific incident
    public function getUserVote(Request $request, $incidentId)
    {
        $vote = Vote::where('user_id', $request->user()->id)
            ->where('incident_id', $incidentId)
            ->first();

        return response()->json([
            'vote' => $vote ? $vote->action : null,
        ]);
    }

    // Get all votes by the current user (used to bulk-load state on page load)
    public function getUserVotes(Request $request)
    {
        $votes = Vote::where('user_id', $request->user()->id)
            ->pluck('action', 'incident_id');

        return response()->json($votes);
    }
}
