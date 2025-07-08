<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        static $customerNumber = 1;
        $createdAt = $this->faker->dateTimeBetween('-1 year');

        return [
            'user_id' => 1,
            'customer_number' => 'C-' . str_pad($customerNumber++, 5, '0', STR_PAD_LEFT),
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'avatar' => null,
            'type' => $this->faker->randomElement(['individual', 'business']),
            'created_at' => $createdAt,
            'updated_at' => $this->faker->dateTimeBetween($createdAt),
        ];
    }
}
