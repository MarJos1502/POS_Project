<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Http\Requests\StoreSurveyRequest;
use Illuminate\Http\Request; // Still useful for general request access
use Illuminate\Support\Facades\Log; // For logging errors/info
use Illuminate\Validation\ValidationException; // For explicit validation errors

class SurveyController extends Controller
{
    /**
     * Store a new survey response via API.
     *
     * @param  \App\Http\Requests\StoreSurveyRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreSurveyRequest $request)
    {
        try {
            // The StoreSurveyRequest handles validation. If it passes, we proceed.
            // The 'unique:surveys,transaction_id' rule in StoreSurveyRequest will handle duplicates.
            $survey = Survey::create([
                'transaction_id' => $request->input('transaction_id'),
                'rating' => $request->input('rating'),
                'comments' => $request->input('comments'),
            ]);

            // Log success (optional)
            Log::info('Survey submitted successfully via API', [
                'transaction_id' => $request->input('transaction_id'),
                'rating' => $request->input('rating'),
                'survey_id' => $survey->id
            ]);

            return response()->json([
                'message' => 'Thank you for your feedback!',
                'survey' => $survey // Return the created survey data
            ], 201); // 201 Created status code

        } catch (ValidationException $e) {
            // This specific catch for ValidationException is usually not needed if
            // StoreSurveyRequest handles it automatically, but useful for custom handling.
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422); // 422 Unprocessable Entity
        } catch (\Exception $e) {
            // Log the error
            Log::error('Error submitting survey via API', [
                'transaction_id' => $request->input('transaction_id'),
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString() // Include stack trace for debugging
            ]);

            // Return a generic error response
            return response()->json([
                'message' => 'An unexpected error occurred. Please try again later.'
            ], 500); // 500 Internal Server Error
        }
    }

    /**
     * (Optional) Check if a transaction has already been surveyed.
     * This is for an API endpoint that a frontend might query.
     *
     * @param string $transactionId
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkStatus(string $transactionId)
    {
        $surveyExists = Survey::where('transaction_id', $transactionId)->exists();

        return response()->json([
            'transaction_id' => $transactionId,
            'survey_submitted' => $surveyExists
        ]);
    }
}