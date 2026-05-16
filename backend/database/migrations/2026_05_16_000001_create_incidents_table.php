<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('incidents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('location');
            $table->string('type', 100);
            $table->dateTime('time');
            $table->enum('status', ['Verified', 'Unverified', 'Rejected'])->default('Unverified');
            $table->text('note')->nullable();
            $table->integer('confirms')->default(0);
            $table->integer('rejects')->default(0);
            $table->timestamps();

            $table->index('location');
            $table->index('type');
            $table->index('status');
            $table->index('time');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('incidents');
    }
};
