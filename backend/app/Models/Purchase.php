<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    use HasFactory;
    protected $fillable = [
        'customer_name',
        'customer_email',
        'mobile',
        'status',
        'total',
        'address',
        'note',
    ];
    public function products()
    {
        return $this->belongsToMany(Product::class, 'purchase_products')
            ->withPivot('quantity', 'price');
    }
}
