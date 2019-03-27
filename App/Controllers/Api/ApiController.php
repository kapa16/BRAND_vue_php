<?php

namespace App\Controllers\Api;

class ApiController
{
    protected $data;
    protected $errorMessage;

    protected function success(): string
    {
        return '{"result": 1, "data":' . json_encode($this->data) . ', "message": ""}';
    }

    protected function error(): string
    {
        return '{"result": 0}, "data": "", "message": ' . $this->errorMessage . '}';
    }
}