<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Incident extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'title', 'location', 'type',
        'time', 'status', 'note', 'confirms', 'rejects',
    ];

    protected $casts = [
        'time'     => 'datetime',
        'confirms' => 'integer',
        'rejects'  => 'integer',
    ];

    // Get the user who reported this incident
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Get all votes on this incident
    public function votes()
    {
        return $this->hasMany(Vote::class);
    }

    // Recalculate status based on community votes
    // +10 difference = Verified, -10 = Rejected, otherwise Unverified
    public function recalculateStatus(): void
    {
        $diff = $this->confirms - $this->rejects;

        if ($diff >= 10) {
            $this->status = 'Verified';
        } elseif ($diff <= -10) {
            $this->status = 'Rejected';
        } else {
            $this->status = 'Unverified';
        }

        $this->save();
    }
}
