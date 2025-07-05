<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        static $productNumber = 1;

        return [
            'user_id' => 1,
            'product_number' => 'P-' . str_pad($productNumber++, 5, '0', STR_PAD_LEFT),
            'name' => $this->faker->word,
            'description' => $this->faker->sentence,
            'image' => null,
            'price' => $this->faker->randomFloat(2, 10, 1000),
            'quantity' => $this->faker->numberBetween(1, 100),
        ];
    }
}
