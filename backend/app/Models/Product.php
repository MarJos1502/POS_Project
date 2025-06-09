<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    protected $fillable = [
        'name', 
        'price', 
        'image',
        'brand',
        'quantity',
        'status'

    ]; // Allow mass assignment

    protected $appends = ['image_url']; // Add image URL dynamically

    // Accessor to get full URL for image
    public function getImageUrlAttribute()
    {
        return $this->image ? asset(Storage::url($this->image)) : null;
    }
}
