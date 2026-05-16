<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    protected $fillable = [
        'user_id', 'incident_id', 'action',
    ];

    // Get the user who cast this vote
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Get the incident this vote belongs to
    public function incident()
    {
        return $this->belongsTo(Incident::class);
    }
}
