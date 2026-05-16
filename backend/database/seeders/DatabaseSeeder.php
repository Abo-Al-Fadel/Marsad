<?php

namespace Database\Seeders;

use App\Models\Incident;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    // Seed the database with a demo user and 12 sample incidents
    public function run(): void
    {
        $user = User::create([
            'name'     => 'Marsad System',
            'email'    => 'system@marsad.lb',
            'password' => Hash::make('password123'),
        ]);

        $incidents = [
            [
                'title'    => 'Airstrike reported in Dahiyeh',
                'location' => 'Dahiyeh',
                'type'     => 'Airstrike',
                'time'     => now()->subHours(10),
                'status'   => 'Verified',
                'note'     => 'Loud explosion heard near the southern highway. Multiple buildings affected.',
                'confirms' => 24,
                'rejects'  => 3,
            ],
            [
                'title'    => 'Drone activity over Tyre coastline',
                'location' => 'Tyre',
                'type'     => 'Surveillance Drone',
                'time'     => now()->subHours(8),
                'status'   => 'Unverified',
                'note'     => 'Residents report low-flying drone circling the old city area for over 30 minutes.',
                'confirms' => 8,
                'rejects'  => 5,
            ],
            [
                'title'    => 'Explosion near Sidon port',
                'location' => 'Sidon',
                'type'     => 'Explosion',
                'time'     => now()->subHours(15),
                'status'   => 'Verified',
                'note'     => 'Warehouse fire triggered a secondary explosion. Smoke visible from highway.',
                'confirms' => 31,
                'rejects'  => 1,
            ],
            [
                'title'    => 'Artillery shelling in Khiam',
                'location' => 'Khiam',
                'type'     => 'Shelling',
                'time'     => now()->subHours(18),
                'status'   => 'Verified',
                'note'     => 'Heavy shelling reported near the eastern perimeter. Ambulances dispatched.',
                'confirms' => 42,
                'rejects'  => 2,
            ],
            [
                'title'    => 'Reconnaissance drone over Baalbek',
                'location' => 'Baalbek',
                'type'     => 'Drone Strike',
                'time'     => now()->subDay()->subHours(12),
                'status'   => 'Unverified',
                'note'     => 'High-altitude drone spotted near the Bekaa Valley. No strikes reported.',
                'confirms' => 6,
                'rejects'  => 9,
            ],
            [
                'title'    => 'Airstrike on Nabatieh market district',
                'location' => 'Nabatieh',
                'type'     => 'Airstrike',
                'time'     => now()->subDay()->subHours(6),
                'status'   => 'Verified',
                'note'     => 'Direct hit on commercial zone. Emergency services on scene.',
                'confirms' => 56,
                'rejects'  => 4,
            ],
            [
                'title'    => 'Suspicious blast in Beirut suburbs',
                'location' => 'Beirut',
                'type'     => 'Explosion',
                'time'     => now()->subDay()->subHours(20),
                'status'   => 'Rejected',
                'note'     => 'Initial reports of explosion later attributed to electrical transformer failure.',
                'confirms' => 3,
                'rejects'  => 27,
            ],
            [
                'title'    => 'Mortar shelling near Bint Jbeil',
                'location' => 'Bint Jbeil',
                'type'     => 'Shelling',
                'time'     => now()->subDay()->subHours(3),
                'status'   => 'Verified',
                'note'     => 'Intermittent shelling heard along the southern border. Civilians evacuating.',
                'confirms' => 38,
                'rejects'  => 2,
            ],
            [
                'title'    => 'Missile launch detected near Hermel',
                'location' => 'Hermel',
                'type'     => 'Missile Launch',
                'time'     => now()->subHours(12),
                'status'   => 'Unverified',
                'note'     => 'Multiple witnesses report bright trail across the sky. No confirmation yet.',
                'confirms' => 11,
                'rejects'  => 14,
            ],
            [
                'title'    => 'Airstrike on Marjayoun outskirts',
                'location' => 'Marjayoun',
                'type'     => 'Airstrike',
                'time'     => now()->subHours(17),
                'status'   => 'Verified',
                'note'     => 'Pre-dawn strike targeted infrastructure near the eastern ridge.',
                'confirms' => 47,
                'rejects'  => 5,
            ],
            [
                'title'    => 'Gunfire exchange near Jounieh',
                'location' => 'Jounieh',
                'type'     => 'Gunfire',
                'time'     => now()->subDay()->subHours(10),
                'status'   => 'Unverified',
                'note'     => 'Reports of sustained gunfire near the coastal highway. Cause unknown.',
                'confirms' => 9,
                'rejects'  => 7,
            ],
            [
                'title'    => 'Shelling damages bridge near Tripoli',
                'location' => 'Tripoli',
                'type'     => 'Shelling',
                'time'     => now()->subDay()->subHours(4),
                'status'   => 'Verified',
                'note'     => 'Key supply bridge partially collapsed. Alternative routes being arranged.',
                'confirms' => 33,
                'rejects'  => 3,
            ],
        ];

        foreach ($incidents as $data) {
            Incident::create(array_merge($data, ['user_id' => $user->id]));
        }
    }
}
