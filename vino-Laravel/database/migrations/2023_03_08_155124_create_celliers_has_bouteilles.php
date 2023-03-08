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
        Schema::create('celliers_has_bouteilles', function (Blueprint $table) {
            $table->integer('quantite')->nullable();
            $table->foreignId('bouteille_id')->constrained('bouteilles')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('cellier_id')->constrained('celliers')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('celliers_has_bouteilles');
    }
};
