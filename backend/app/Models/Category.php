<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Category extends Model
{
    protected $fillable = ['name', 'image'];

    protected $appends = ['image_url'];

    // Accessor to get full URL for image
    public function getImageUrlAttribute()
    {
        return $this->image ? asset(Storage::url($this->image)) : null;
    }
}