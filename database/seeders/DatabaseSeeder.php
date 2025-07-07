<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Product;
use App\Models\Sale;
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
            'name' => 'Test User',
            'company' => 'Test Company That have a long name',
            'email' => 'test@example.com',
            'password' => 'password',
        ]);

        Customer::factory(150)->create();
        Product::factory(100)->create();
        Sale::factory(1000)->create();
    }
}
