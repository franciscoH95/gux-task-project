<?php

namespace Database\Factories;
use App\Models\User;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->text(maxNbChars:50),
            'description' => fake()->text(maxNbChars:50),
            'state' => 0,
            'created_at' => now(),
            'updated_at' => now(),
            'user_id' => User::factory(),
        ];
    }
}
