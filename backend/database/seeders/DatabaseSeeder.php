<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test',
            'email' => 'test@example.com',
        ]);

        \App\Models\User::factory()->create([
        'name' => 'Admin',
        'email' => 'admin@gmail.com',
        'usertype' => 'admin',
        'password' => bcrypt('123123123'),
        ]);

        \App\Models\User::factory()->create([
        'name' => 'Cashier',
        'email' => 'cashier@gmail.com',
        'usertype' => 'cashier',
        'password' => bcrypt('123123123'),
        ]);
        
        \App\Models\User::factory()->create([
        'name' => 'Manager',
        'email' => 'manager@gmail.com',
        'usertype' => 'manager',
        'password' => bcrypt('123123123'),
        ]);

    }
}
