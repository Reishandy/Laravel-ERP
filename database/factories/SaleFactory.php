<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sale>
 */
class SaleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $product = Product::inRandomOrder()->first();
        $customerId = Customer::inRandomOrder()->value('id');
        $createdAt = $this->faker->dateTimeBetween('-3 year');
        static $saleNumber = 1;

        return [
            'user_id' => 1,
            'product_id' => $product->id,
            'customer_id' => $customerId,
            'sale_number' => 'S-' . str_pad($saleNumber++, 5, '0', STR_PAD_LEFT),
            'price_at_sale' => $this->faker->boolean(80) ? $product->price : ($product->price * $this->faker->randomFloat(2, 0.5, 1.5)),
            'quantity' => $this->faker->numberBetween(1, 10),
            'total_price' => function (array $attributes) {
                return $attributes['price_at_sale'] * $attributes['quantity'];
            },
            'status' => $this->faker->randomElement(['pending', 'processing', 'completed']),
            'created_at' => $createdAt,
            'updated_at' => $this->faker->dateTimeBetween($createdAt),
        ];
    }
}
