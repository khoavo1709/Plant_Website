<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'full_name' => fake()->name(),
            'role' => fake()->randomElement(['ADMIN', 'EMPLOYEE']),
            'gender' => fake()->randomElement(['MALE', 'FEMALE', 'OTHER']),
            'mobile' => fake()->phoneNumber(),
            'address' => fake()->address(),
            'password' => Hash::make('password'),
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
