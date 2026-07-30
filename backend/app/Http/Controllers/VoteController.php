<?php

namespace App\Http\Controllers;

use App\Models\Incident;
use App\Models\Vote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VoteController extends Controller
{
    // Cast, switch, or remove a vote on an incident (toggle logic)
    public function vote(Request $request, $incidentId)
    {
        $request->validate([
            'action' => 'required|in:confirm,reject',
        ]);

        $user   = $request->user();
        $action = $request->action;

        // The vote counters are denormalised onto the incident row, so the whole
        // read-modify-write has to be atomic. Without the transaction and row
        // lock, two people voting at the same time can each read the same count
        // and one increment is silently lost.
        $payload = DB::transaction(function () use ($incidentId, $user, $action) {
            $incident = Incident::lockForUpdate()->findOrFail($incidentId);

            $existingVote = Vote::where('user_id', $user->id)
                ->where('incident_id', $incident->id)
                ->lockForUpdate()
                ->first();

            if ($existingVote && $existingVote->action === $action) {
                // Same action clicked again → undo (remove the vote)
                $this->decrement($incident, $action);
                $existingVote->delete();

                $message = 'Vote removed.';
                $vote    = null;
            } elseif ($existingVote) {
                // Different action → switch vote (e.g., confirm→reject)
                $this->decrement($incident, $existingVote->action);
                $this->increment($incident, $action);

                $existingVote->action = $action;
                $existingVote->save();

                $message = 'Vote updated.';
                $vote    = $action;
            } else {
                // First time voting on this incident → create new vote record
                Vote::create([
                    'user_id'     => $user->id,
                    'incident_id' => $incident->id,
                    'action'      => $action,
                ]);

                $this->increment($incident, $action);

                $message = 'Vote recorded.';
                $vote    = $action;
            }

            $incident->recalculateStatus();
            $incident->save();

            return [
                'message'  => $message,
                'vote'     => $vote,
                'confirms' => $incident->confirms,
                'rejects'  => $incident->rejects,
                'status'   => $incident->status,
            ];
        });

        return response()->json($payload);
    }

    // Bump the counter matching the given action
    private function increment(Incident $incident, string $action): void
    {
        $column = $action === 'confirm' ? 'confirms' : 'rejects';

        $incident->{$column}++;
    }

    // Reduce the counter matching the given action, never below zero
    private function decrement(Incident $incident, string $action): void
    {
        $column = $action === 'confirm' ? 'confirms' : 'rejects';

        $incident->{$column} = max(0, $incident->{$column} - 1);
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
