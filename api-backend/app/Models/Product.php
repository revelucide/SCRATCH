<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'Title',
        'Description',
        'banner_image',
        'cost',
        'user_id',
    ];
}
