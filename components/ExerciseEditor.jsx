// 💪 Exercise Editor Component
// Comprehensive exercise creation and editing interface

import React, { useState, useEffect } from 'react';
import { createExercise, updateExercise, getCategories } from '../services/contentManagementService';

const ExerciseEditor = ({ exercise, onSave, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    difficulty: 'beginner',
    equipment: 'none',
    targetMuscles: [],
    instructions: [''],
    tips: [''],
    variations: [''],
    duration: 30,
    calories: 0,
    image: '',
    videoUrl: '',
    tags: [],
    status: 'active'
  });

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Equipment options
  const equipmentOptions = [
    'none', 'dumbbells', 'barbell', 'resistance-bands', 'kettlebell',
    'medicine-ball', 'pull-up-bar', 'bench', 'cable-machine', 'treadmill',
    'stationary-bike', 'rowing-machine', 'yoga-mat', 'stability-ball'
  ];

  // Difficulty options
  const difficultyOptions = [
    { value: 'beginner', label: 'Beginner', color: 'bg-green-100 text-green-800' },
    { value: 'intermediate', label: 'Intermediate', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'advanced', label: 'Advanced', color: 'bg-red-100 text-red-800' }
  ];

  // Common muscle groups
  const muscleGroups = [
    'chest', 'back', 'shoulders', 'biceps', 'triceps', 'forearms',
    'core', 'abs', 'obliques', 'quadriceps', 'hamstrings', 'glutes',
    'calves', 'full-body', 'cardio'
  ];

  useEffect(() => {
    loadCategories();
    if (exercise && isEditing) {
      setFormData({
        ...exercise,
        instructions: exercise.instructions || [''],
        tips: exercise.tips || [''],
        variations: exercise.variations || [''],
        targetMuscles: exercise.targetMuscles || [],
        tags: exercise.tags || []
      });
    }
  }, [exercise, isEditing]);

  const loadCategories = async () => {
    try {
      const cats = await getCategories('exercise');
      setCategories(cats);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleMuscleToggle = (muscle) => {
    setFormData(prev => ({
      ...prev,
      targetMuscles: prev.targetMuscles.includes(muscle)
        ? prev.targetMuscles.filter(m => m !== muscle)
        : [...prev.targetMuscles, muscle]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Exercise name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (formData.targetMuscles.length === 0) {
      newErrors.targetMuscles = 'At least one target muscle is required';
    }

    if (formData.instructions.filter(inst => inst.trim()).length === 0) {
      newErrors.instructions = 'At least one instruction is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Clean up data
      const cleanData = {
        ...formData,
        instructions: formData.instructions.filter(inst => inst.trim()),
        tips: formData.tips.filter(tip => tip.trim()),
        variations: formData.variations.filter(variation => variation.trim()),
        duration: parseInt(formData.duration),
        calories: parseInt(formData.calories)
      };

      let result;
      if (isEditing) {
        result = await updateExercise(exercise.id, cleanData);
      } else {
        result = await createExercise(cleanData);
      }

      onSave(result);
    } catch (error) {
      console.error('Failed to save exercise:', error);
      setErrors({ submit: 'Failed to save exercise. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">
          {isEditing ? '✏️ Edit Exercise' : '➕ Create New Exercise'}
        </h2>
        <p className="text-gray-600 mt-1">
          {isEditing ? 'Update exercise details' : 'Add a new exercise to the database'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Exercise Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Exercise Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="e.g., Push-ups"
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                errors.category ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category}</p>}
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty Level
            </label>
            <div className="flex space-x-2">
              {difficultyOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleInputChange('difficulty', option.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    formData.difficulty === option.value
                      ? option.color
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Equipment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Equipment Required
            </label>
            <select
              value={formData.equipment}
              onChange={(e) => handleInputChange('equipment', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              {equipmentOptions.map((equipment) => (
                <option key={equipment} value={equipment}>
                  {equipment.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (seconds)
            </label>
            <input
              type="number"
              value={formData.duration}
              onChange={(e) => handleInputChange('duration', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              min="10"
              max="3600"
            />
          </div>

          {/* Calories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Calories Burned (estimate)
            </label>
            <input
              type="number"
              value={formData.calories}
              onChange={(e) => handleInputChange('calories', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              min="0"
              max="1000"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={3}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
              errors.description ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Describe the exercise and its benefits..."
          />
          {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Target Muscles */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Muscles *
          </label>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
            {muscleGroups.map((muscle) => (
              <button
                key={muscle}
                type="button"
                onClick={() => handleMuscleToggle(muscle)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  formData.targetMuscles.includes(muscle)
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
              </button>
            ))}
          </div>
          {errors.targetMuscles && <p className="text-red-600 text-sm mt-1">{errors.targetMuscles}</p>}
        </div>

        {/* Instructions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Instructions *
          </label>
          {formData.instructions.map((instruction, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <span className="text-sm text-gray-500 w-8">{index + 1}.</span>
              <input
                type="text"
                value={instruction}
                onChange={(e) => handleArrayChange('instructions', index, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Enter instruction step..."
              />
              {formData.instructions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('instructions', index)}
                  className="text-red-600 hover:text-red-700"
                >
                  ❌
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('instructions')}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            + Add Instruction
          </button>
          {errors.instructions && <p className="text-red-600 text-sm mt-1">{errors.instructions}</p>}
        </div>

        {/* Media */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => handleInputChange('image', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="https://example.com/exercise-image.jpg"
            />
          </div>

          {/* Video URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Video URL
            </label>
            <input
              type="url"
              value={formData.videoUrl}
              onChange={(e) => handleInputChange('videoUrl', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="https://example.com/exercise-video.mp4"
            />
          </div>
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {errors.submit}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </div>
            ) : (
              isEditing ? 'Update Exercise' : 'Create Exercise'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExerciseEditor;
