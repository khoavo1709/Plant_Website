<?php

namespace App\Models;

use Cloudinary\Cloudinary;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'name', 'type', 'title', 'description', 'price', 'quantity', 'image',
    ];

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'product_categories');
    }

    public function deleteImageFromCloudinary($image)
    {
        $publicId = pathinfo($image)['filename'];
        $cloudinary = new Cloudinary();
        $cloudinary->uploadApi()->destroy($publicId);
    }
}