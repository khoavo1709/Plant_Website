<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $paragraph = $this->faker->paragraph;
        $limitedDescription = implode(' ', array_slice(str_word_count($paragraph, 1), 0, 50));

        return [
            'name' => $this->faker->name,
            'type' => $this->faker->randomElement(['PLANT', 'ACCESSORY']),
            'title' => $this->faker->sentence,
            'description' => $limitedDescription,
            'price' => $this->faker->randomFloat(2, 1, 100),
            'quantity' => $this->faker->numberBetween(1, 100),
            'image' => $this->faker->imageUrl(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }


    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
