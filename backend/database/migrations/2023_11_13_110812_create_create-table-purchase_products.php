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
        if (!Schema::hasTable('purchase_products')) {
            Schema::create('purchase_products', function (Blueprint $table) {
                $table->foreignId('purchase_id');
                $table->foreignId('product_id');
                $table->integer('quantity')->unsigned();
                $table->float('price');
                $table->foreign('purchase_id')->on('purchases')->references('id');
                $table->foreign('product_id')->on('products')->references('id');
                $table->primary(['purchase_id', 'product_id']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('purchase_products')) {
            Schema::drop('purchase_products');
        }
    }
};
