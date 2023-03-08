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
        Schema::create('bouteilles', function (Blueprint $table) {
            $table->id();
            $table->string('nom',255);
            $table->string('format',255)->nullable();
            $table->float('prix',8,2)->nullable();
            $table->text('description')->nullable();
            $table->integer('annee')->nullable();
            $table->integer('code_saq')->nullable();
            $table->string('url_saq',255)->nullable();
            $table->string('url_img',255)->nullable();
            $table->foreignId('pay_id')->constrained('pays')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('type_id')->constrained('types')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bouteilles');
    }
};
