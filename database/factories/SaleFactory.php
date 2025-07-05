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
        static $saleNumber = 1;

        return [
            'user_id' => 1,
            'product_id' => $product->id,
            'customer_id' => $customerId,
            'sale_number' => $saleNumber++,
            'price_at_sale' => $product->price,
            'quantity' => $this->faker->numberBetween(1, 10),
            'total_price' => function (array $attributes) {
                return $attributes['price_at_sale'] * $attributes['quantity'];
            },
            'status' => $this->faker->randomElement(['pending', 'processing', 'completed']),
        ];
    }
}
