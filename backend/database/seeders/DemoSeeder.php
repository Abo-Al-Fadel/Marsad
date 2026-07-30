<?php

namespace Database\Seeders;

use App\Models\Incident;
use App\Models\User;
use App\Models\Vote;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

/**
 * Populates the app with a realistic-looking dataset so the deployed demo is
 * not an empty page.
 *
 * Everything created here is fictional. Enable the banner (DEMO_NOTICE=true)
 * whenever this seeder has been run against a public deployment, so nobody
 * mistakes the sample reports for real ones.
 *
 * Two things this is careful about:
 *
 *  - Vote counters are backed by real rows in the votes table, so the numbers
 *    on screen agree with the vote history and continue to behave correctly
 *    when a visitor votes.
 *  - Statuses are derived with recalculateStatus() rather than hardcoded, so
 *    they always satisfy the documented +/-10 rule.
 *
 * Safe to run more than once: it does nothing if the demo accounts exist.
 *
 *     php artisan db:seed --class=DemoSeeder
 */
class DemoSeeder extends Seeder
{
    private const DEMO_DOMAIN = '@demo.marsad.local';

    public function run(): void
    {
        if (User::where('email', 'LIKE', '%' . self::DEMO_DOMAIN)->exists()) {
            $this->command->warn('Demo data already present - nothing to do.');

            return;
        }

        $this->command->info('Seeding demo dataset...');

        $authors = $this->createUsers($this->authorNames(), 'reporter');
        $voters  = $this->createUsers($this->voterNames(), 'voter');

        $created = 0;

        foreach ($this->incidents() as $data) {
            $author = $authors[array_rand($authors)];

            $incident = Incident::create([
                'user_id'  => $author->id,
                'title'    => $data['type'] . ' reported in ' . $data['location'],
                'location' => $data['location'],
                'type'     => $data['type'],
                'time'     => now()->subMinutes($data['minutes_ago']),
                'status'   => 'Unverified',
                'note'     => $data['note'],
                'confirms' => 0,
                'rejects'  => 0,
            ]);

            $this->applyVotes($incident, $voters, $data['confirms'], $data['rejects']);
            $created++;
        }

        $this->command->info("Created {$created} incidents, "
            . count($authors) . ' reporters, '
            . count($voters) . ' voters, '
            . Vote::count() . ' votes.');
        $this->command->info('Verified: ' . Incident::where('status', 'Verified')->count()
            . ' | Unverified: ' . Incident::where('status', 'Unverified')->count()
            . ' | Rejected: ' . Incident::where('status', 'Rejected')->count());
    }

    /** @return User[] */
    private function createUsers(array $names, string $prefix): array
    {
        $users = [];

        foreach ($names as $i => $name) {
            $users[] = User::create([
                'name'     => $name,
                'email'    => $prefix . ($i + 1) . self::DEMO_DOMAIN,
                'password' => Hash::make(bin2hex(random_bytes(16))),
            ]);
        }

        return $users;
    }

    /**
     * Record real votes so the counters are backed by history rather than
     * being decorative numbers. Each voter votes at most once per incident,
     * matching the unique(user_id, incident_id) constraint.
     */
    private function applyVotes(Incident $incident, array $voters, int $confirms, int $rejects): void
    {
        $pool = $voters;
        shuffle($pool);

        $needed = $confirms + $rejects;
        if ($needed > count($pool)) {
            $confirms = (int) round($confirms * count($pool) / $needed);
            $rejects  = count($pool) - $confirms;
        }

        $rows = [];
        $now  = now();
        $i    = 0;

        foreach (['confirm' => $confirms, 'reject' => $rejects] as $action => $count) {
            for ($n = 0; $n < $count; $n++, $i++) {
                $rows[] = [
                    'user_id'     => $pool[$i]->id,
                    'incident_id' => $incident->id,
                    'action'      => $action,
                    // Votes trickle in after the report, never before it.
                    'created_at'  => $now,
                    'updated_at'  => $now,
                ];
            }
        }

        foreach (array_chunk($rows, 100) as $chunk) {
            DB::table('votes')->insert($chunk);
        }

        $incident->confirms = $confirms;
        $incident->rejects  = $rejects;
        $incident->recalculateStatus();
        $incident->save();
    }

    private function authorNames(): array
    {
        return [
            'Rami Haddad', 'Nour Khalil', 'Zeina Aoun', 'Hadi Mansour',
            'Layal Chamoun', 'Karim Btaiche', 'Maya Sfeir', 'Elie Rahme',
        ];
    }

    private function voterNames(): array
    {
        $first = ['Ali', 'Sara', 'Omar', 'Rita', 'Jad', 'Dana', 'Fadi', 'Lina', 'Tarek', 'Yara',
                  'Hassan', 'Mira', 'Ziad', 'Nada', 'Samir', 'Rana', 'Bilal', 'Hala', 'Wassim', 'Joelle'];
        $last  = ['Saad', 'Nassar', 'Abboud', 'Daher', 'Kanaan', 'Hamdan', 'Zeidan', 'Chidiac'];

        $names = [];
        foreach ($first as $f) {
            foreach ($last as $l) {
                $names[] = "$f $l";
                if (count($names) >= 60) {
                    return $names;
                }
            }
        }

        return $names;
    }

    /**
     * Spread across the last ~40 hours so the dashboard's "today / yesterday"
     * timeline has content and the relative timestamps read naturally.
     * Only locations that have map coordinates are used, so every incident
     * also produces a marker.
     */
    private function incidents(): array
    {
        return [
            ['location' => 'Dahiyeh',    'type' => 'Airstrike',          'minutes_ago' => 8,    'confirms' => 34, 'rejects' => 2,  'note' => 'Loud explosion heard near the southern highway. Several buildings reported damaged and emergency crews are on site.'],
            ['location' => 'Tyre',       'type' => 'Surveillance Drone', 'minutes_ago' => 22,   'confirms' => 7,  'rejects' => 4,  'note' => 'Low-flying drone circling the old city for roughly half an hour. No strikes reported so far.'],
            ['location' => 'Nabatieh',   'type' => 'Shelling',           'minutes_ago' => 41,   'confirms' => 28, 'rejects' => 3,  'note' => 'Sustained shelling on the eastern edge of town. Residents moving towards the town centre.'],
            ['location' => 'Beirut',     'type' => 'Sonic Boom',         'minutes_ago' => 55,   'confirms' => 19, 'rejects' => 6,  'note' => 'Very loud boom over the city, windows rattling. No sign of an impact anywhere.'],
            ['location' => 'Khiam',      'type' => 'Artillery Fire',     'minutes_ago' => 78,   'confirms' => 31, 'rejects' => 1,  'note' => 'Repeated outgoing and incoming fire along the ridge. Ambulances dispatched from Marjayoun.'],
            ['location' => 'Sidon',      'type' => 'Explosion',          'minutes_ago' => 96,   'confirms' => 25, 'rejects' => 4,  'note' => 'Blast near the port followed by heavy black smoke. Initial reports point to a fuel storage fire.'],
            ['location' => 'Baalbek',    'type' => 'Drone Strike',       'minutes_ago' => 124,  'confirms' => 22, 'rejects' => 5,  'note' => 'Single strike on the outskirts, away from residential blocks. Road closed in both directions.'],
            ['location' => 'Bint Jbeil', 'type' => 'Mortar Fire',        'minutes_ago' => 150,  'confirms' => 6,  'rejects' => 8,  'note' => 'Residents report several impacts to the south. Difficult to confirm the exact location.'],
            ['location' => 'Tripoli',    'type' => 'Power Outage',       'minutes_ago' => 175,  'confirms' => 15, 'rejects' => 2,  'note' => 'Widespread outage across several neighbourhoods for over two hours. Cause not yet announced.'],
            ['location' => 'Marjayoun',  'type' => 'Airstrike',          'minutes_ago' => 210,  'confirms' => 29, 'rejects' => 3,  'note' => 'Pre-dawn strike on infrastructure near the eastern ridge. Access road badly damaged.'],
            ['location' => 'Jounieh',    'type' => 'Gunfire',            'minutes_ago' => 245,  'confirms' => 5,  'rejects' => 11, 'note' => 'Reports of sustained gunfire near the coastal road. Later attributed to a celebration.'],
            ['location' => 'Hermel',     'type' => 'Missile Launch',     'minutes_ago' => 288,  'confirms' => 12, 'rejects' => 9,  'note' => 'Bright trail seen crossing the sky from several villages. Direction of travel unclear.'],
            ['location' => 'Aita al-Shaab', 'type' => 'Incursion',       'minutes_ago' => 330,  'confirms' => 21, 'rejects' => 4,  'note' => 'Movement reported close to the perimeter. Residents advised to stay indoors.'],
            ['location' => 'Chebaa',     'type' => 'Shelling',           'minutes_ago' => 372,  'confirms' => 24, 'rejects' => 2,  'note' => 'Intermittent shelling in the surrounding hills through the early morning.'],
            ['location' => 'Naqoura',    'type' => 'Naval Bombardment',  'minutes_ago' => 415,  'confirms' => 17, 'rejects' => 6,  'note' => 'Sound of naval fire offshore. Fishing boats returning to harbour.'],
            ['location' => 'Zahlé',      'type' => 'Roadblock',          'minutes_ago' => 460,  'confirms' => 9,  'rejects' => 3,  'note' => 'Main road blocked in both directions. Traffic being diverted through the village.'],
            ['location' => 'Tebnine',    'type' => 'Drone Strike',       'minutes_ago' => 520,  'confirms' => 26, 'rejects' => 5,  'note' => 'Strike on a vehicle on the approach road. Emergency services attended.'],
            ['location' => 'Byblos',     'type' => 'Evacuation',         'minutes_ago' => 585,  'confirms' => 13, 'rejects' => 2,  'note' => 'Several families arriving from the south and being housed in local schools.'],
            ['location' => 'Arsal',      'type' => 'Armed Clash',        'minutes_ago' => 640,  'confirms' => 8,  'rejects' => 7,  'note' => 'Exchange of fire reported on the eastern edge. Details still unclear.'],
            ['location' => 'Ghobeiry',   'type' => 'Fire',               'minutes_ago' => 700,  'confirms' => 20, 'rejects' => 3,  'note' => 'Large fire in a commercial building. Civil defence brought it under control after two hours.'],
            ['location' => 'Qana',       'type' => 'Airstrike',          'minutes_ago' => 780,  'confirms' => 30, 'rejects' => 4,  'note' => 'Strike close to farmland on the village edge. No casualties reported.'],
            ['location' => 'Rmeich',     'type' => 'Surveillance Drone', 'minutes_ago' => 860,  'confirms' => 4,  'rejects' => 6,  'note' => 'Persistent drone noise overhead for most of the afternoon.'],
            ['location' => 'Baabda',     'type' => 'Sonic Boom',         'minutes_ago' => 940,  'confirms' => 16, 'rejects' => 8,  'note' => 'Two loud booms in quick succession. No damage reported anywhere in the area.'],
            ['location' => 'Hasbaya',    'type' => 'Shelling',           'minutes_ago' => 1030, 'confirms' => 23, 'rejects' => 3,  'note' => 'Shelling reported on the slopes above the town. Schools closed for the day.'],
            ['location' => 'Beirut',     'type' => 'Demolition',         'minutes_ago' => 1120, 'confirms' => 3,  'rejects' => 18, 'note' => 'Reported as a blast, later confirmed to be a scheduled controlled demolition.'],
            ['location' => 'Kfar Kila',  'type' => 'Artillery Fire',     'minutes_ago' => 1210, 'confirms' => 27, 'rejects' => 2,  'note' => 'Heavy exchange along the border strip lasting around forty minutes.'],
            ['location' => 'Damour',     'type' => 'Roadblock',          'minutes_ago' => 1320, 'confirms' => 7,  'rejects' => 5,  'note' => 'Coastal road partially closed. Long delays reported in both directions.'],
            ['location' => 'Mays al-Jabal', 'type' => 'Incursion',       'minutes_ago' => 1450, 'confirms' => 18, 'rejects' => 6,  'note' => 'Activity reported near the outskirts overnight. Situation calmer by morning.'],
            ['location' => 'Batroun',    'type' => 'Power Outage',       'minutes_ago' => 1580, 'confirms' => 11, 'rejects' => 4,  'note' => 'Outage affecting the coastal strip. Generators covering most of the town.'],
            ['location' => 'Bcharre',    'type' => 'Supply Drop',        'minutes_ago' => 1720, 'confirms' => 14, 'rejects' => 3,  'note' => 'Aid delivery reaching villages cut off by the recent road closures.'],
            ['location' => 'Jezzine',    'type' => 'Gunfire',            'minutes_ago' => 1880, 'confirms' => 2,  'rejects' => 15, 'note' => 'Reported gunfire turned out to be construction work near the main square.'],
            ['location' => 'Anjar',      'type' => 'Armed Clash',        'minutes_ago' => 2050, 'confirms' => 19, 'rejects' => 7,  'note' => 'Brief exchange reported near the crossing. Calm restored within the hour.'],
        ];
    }
}
