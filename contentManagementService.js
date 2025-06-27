// 🛠️ Content Management Service
// Comprehensive CMS for managing exercises, workouts, recipes, and content

import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase/firebase-config';

class ContentManagementService {
  constructor() {
    this.exercisesCollection = 'exercises';
    this.workoutTemplatesCollection = 'workoutTemplates';
    this.recipesCollection = 'recipes';
    this.contentCollection = 'content';
    this.categoriesCollection = 'categories';
  }

  // 💪 EXERCISE MANAGEMENT

  // Get all exercises with filtering
  async getExercises(filters = {}) {
    try {
      let q = collection(db, this.exercisesCollection);
      const constraints = [];

      if (filters.category) {
        constraints.push(where('category', '==', filters.category));
      }
      if (filters.difficulty) {
        constraints.push(where('difficulty', '==', filters.difficulty));
      }
      if (filters.equipment) {
        constraints.push(where('equipment', '==', filters.equipment));
      }

      constraints.push(orderBy('name', 'asc'));
      
      if (constraints.length > 0) {
        q = query(q, ...constraints);
      }

      const snapshot = await getDocs(q);
      const exercises = [];
      
      snapshot.forEach((doc) => {
        exercises.push({
          id: doc.id,
          ...doc.data()
        });
      });

      return exercises;
    } catch (error) {
      console.error('Error fetching exercises:', error);
      throw new Error('Failed to fetch exercises');
    }
  }

  // Get single exercise
  async getExercise(exerciseId) {
    try {
      const docRef = doc(db, this.exercisesCollection, exerciseId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error('Exercise not found');
      }
    } catch (error) {
      console.error('Error fetching exercise:', error);
      throw new Error('Failed to fetch exercise');
    }
  }

  // Create new exercise
  async createExercise(exerciseData) {
    try {
      const newExercise = {
        ...exerciseData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: 'active',
        version: 1
      };

      const docRef = await addDoc(collection(db, this.exercisesCollection), newExercise);
      return { id: docRef.id, ...newExercise };
    } catch (error) {
      console.error('Error creating exercise:', error);
      throw new Error('Failed to create exercise');
    }
  }

  // Update exercise
  async updateExercise(exerciseId, updates) {
    try {
      const docRef = doc(db, this.exercisesCollection, exerciseId);
      const updateData = {
        ...updates,
        updatedAt: serverTimestamp(),
        version: (updates.version || 1) + 1
      };

      await updateDoc(docRef, updateData);
      return { id: exerciseId, ...updateData };
    } catch (error) {
      console.error('Error updating exercise:', error);
      throw new Error('Failed to update exercise');
    }
  }

  // Delete exercise (soft delete)
  async deleteExercise(exerciseId) {
    try {
      const docRef = doc(db, this.exercisesCollection, exerciseId);
      await updateDoc(docRef, {
        status: 'deleted',
        deletedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error('Error deleting exercise:', error);
      throw new Error('Failed to delete exercise');
    }
  }

  // 🏋️ WORKOUT TEMPLATE MANAGEMENT

  // Get workout templates
  async getWorkoutTemplates(filters = {}) {
    try {
      let q = collection(db, this.workoutTemplatesCollection);
      const constraints = [];

      if (filters.category) {
        constraints.push(where('category', '==', filters.category));
      }
      if (filters.difficulty) {
        constraints.push(where('difficulty', '==', filters.difficulty));
      }

      constraints.push(orderBy('name', 'asc'));
      
      if (constraints.length > 0) {
        q = query(q, ...constraints);
      }

      const snapshot = await getDocs(q);
      const templates = [];
      
      snapshot.forEach((doc) => {
        templates.push({
          id: doc.id,
          ...doc.data()
        });
      });

      return templates;
    } catch (error) {
      console.error('Error fetching workout templates:', error);
      throw new Error('Failed to fetch workout templates');
    }
  }

  // Create workout template
  async createWorkoutTemplate(templateData) {
    try {
      const newTemplate = {
        ...templateData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: 'active',
        version: 1
      };

      const docRef = await addDoc(collection(db, this.workoutTemplatesCollection), newTemplate);
      return { id: docRef.id, ...newTemplate };
    } catch (error) {
      console.error('Error creating workout template:', error);
      throw new Error('Failed to create workout template');
    }
  }

  // Update workout template
  async updateWorkoutTemplate(templateId, updates) {
    try {
      const docRef = doc(db, this.workoutTemplatesCollection, templateId);
      const updateData = {
        ...updates,
        updatedAt: serverTimestamp(),
        version: (updates.version || 1) + 1
      };

      await updateDoc(docRef, updateData);
      return { id: templateId, ...updateData };
    } catch (error) {
      console.error('Error updating workout template:', error);
      throw new Error('Failed to update workout template');
    }
  }

  // 🍳 RECIPE MANAGEMENT

  // Get recipes for CMS
  async getRecipesForCMS(filters = {}) {
    try {
      let q = collection(db, this.recipesCollection);
      const constraints = [];

      if (filters.category) {
        constraints.push(where('category', '==', filters.category));
      }
      if (filters.difficulty) {
        constraints.push(where('difficulty', '==', filters.difficulty));
      }

      constraints.push(orderBy('name', 'asc'));
      
      if (constraints.length > 0) {
        q = query(q, ...constraints);
      }

      const snapshot = await getDocs(q);
      const recipes = [];
      
      snapshot.forEach((doc) => {
        recipes.push({
          id: doc.id,
          ...doc.data()
        });
      });

      return recipes;
    } catch (error) {
      console.error('Error fetching recipes for CMS:', error);
      throw new Error('Failed to fetch recipes');
    }
  }

  // Create recipe
  async createRecipe(recipeData) {
    try {
      const newRecipe = {
        ...recipeData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: 'active',
        version: 1
      };

      const docRef = await addDoc(collection(db, this.recipesCollection), newRecipe);
      return { id: docRef.id, ...newRecipe };
    } catch (error) {
      console.error('Error creating recipe:', error);
      throw new Error('Failed to create recipe');
    }
  }

  // Update recipe
  async updateRecipe(recipeId, updates) {
    try {
      const docRef = doc(db, this.recipesCollection, recipeId);
      const updateData = {
        ...updates,
        updatedAt: serverTimestamp(),
        version: (updates.version || 1) + 1
      };

      await updateDoc(docRef, updateData);
      return { id: recipeId, ...updateData };
    } catch (error) {
      console.error('Error updating recipe:', error);
      throw new Error('Failed to update recipe');
    }
  }

  // 📂 CATEGORY MANAGEMENT

  // Get categories
  async getCategories(type = 'exercise') {
    try {
      const q = query(
        collection(db, this.categoriesCollection),
        where('type', '==', type),
        orderBy('name', 'asc')
      );

      const snapshot = await getDocs(q);
      const categories = [];
      
      snapshot.forEach((doc) => {
        categories.push({
          id: doc.id,
          ...doc.data()
        });
      });

      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Failed to fetch categories');
    }
  }

  // Create category
  async createCategory(categoryData) {
    try {
      const newCategory = {
        ...categoryData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: 'active'
      };

      const docRef = await addDoc(collection(db, this.categoriesCollection), newCategory);
      return { id: docRef.id, ...newCategory };
    } catch (error) {
      console.error('Error creating category:', error);
      throw new Error('Failed to create category');
    }
  }

  // 📊 CONTENT STATISTICS

  // Get content statistics
  async getContentStats() {
    try {
      const [exercises, workoutTemplates, recipes] = await Promise.all([
        getDocs(collection(db, this.exercisesCollection)),
        getDocs(collection(db, this.workoutTemplatesCollection)),
        getDocs(collection(db, this.recipesCollection))
      ]);

      const stats = {
        exercises: {
          total: exercises.size,
          active: 0,
          draft: 0,
          deleted: 0
        },
        workoutTemplates: {
          total: workoutTemplates.size,
          active: 0,
          draft: 0
        },
        recipes: {
          total: recipes.size,
          active: 0,
          draft: 0
        }
      };

      // Count exercise statuses
      exercises.forEach((doc) => {
        const status = doc.data().status || 'active';
        stats.exercises[status] = (stats.exercises[status] || 0) + 1;
      });

      // Count workout template statuses
      workoutTemplates.forEach((doc) => {
        const status = doc.data().status || 'active';
        stats.workoutTemplates[status] = (stats.workoutTemplates[status] || 0) + 1;
      });

      // Count recipe statuses
      recipes.forEach((doc) => {
        const status = doc.data().status || 'active';
        stats.recipes[status] = (stats.recipes[status] || 0) + 1;
      });

      return stats;
    } catch (error) {
      console.error('Error fetching content stats:', error);
      throw new Error('Failed to fetch content statistics');
    }
  }

  // 🔍 SEARCH CONTENT

  // Search across all content types
  async searchContent(searchTerm, contentType = 'all') {
    try {
      const results = {
        exercises: [],
        workoutTemplates: [],
        recipes: []
      };

      if (contentType === 'all' || contentType === 'exercises') {
        const exercises = await this.getExercises();
        results.exercises = exercises.filter(exercise =>
          exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exercise.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exercise.category?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (contentType === 'all' || contentType === 'workoutTemplates') {
        const templates = await this.getWorkoutTemplates();
        results.workoutTemplates = templates.filter(template =>
          template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          template.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (contentType === 'all' || contentType === 'recipes') {
        const recipes = await this.getRecipesForCMS();
        results.recipes = recipes.filter(recipe =>
          recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      return results;
    } catch (error) {
      console.error('Error searching content:', error);
      throw new Error('Failed to search content');
    }
  }

  // 📤 BULK OPERATIONS

  // Bulk update exercises
  async bulkUpdateExercises(exerciseIds, updates) {
    try {
      const promises = exerciseIds.map(id => this.updateExercise(id, updates));
      return await Promise.all(promises);
    } catch (error) {
      console.error('Error bulk updating exercises:', error);
      throw new Error('Failed to bulk update exercises');
    }
  }

  // Bulk delete exercises
  async bulkDeleteExercises(exerciseIds) {
    try {
      const promises = exerciseIds.map(id => this.deleteExercise(id));
      return await Promise.all(promises);
    } catch (error) {
      console.error('Error bulk deleting exercises:', error);
      throw new Error('Failed to bulk delete exercises');
    }
  }
}

// Export singleton instance
const contentManagementService = new ContentManagementService();

// Export main functions
export const getExercises = (filters) => contentManagementService.getExercises(filters);
export const getExercise = (exerciseId) => contentManagementService.getExercise(exerciseId);
export const createExercise = (exerciseData) => contentManagementService.createExercise(exerciseData);
export const updateExercise = (exerciseId, updates) => contentManagementService.updateExercise(exerciseId, updates);
export const deleteExercise = (exerciseId) => contentManagementService.deleteExercise(exerciseId);

export const getWorkoutTemplates = (filters) => contentManagementService.getWorkoutTemplates(filters);
export const createWorkoutTemplate = (templateData) => contentManagementService.createWorkoutTemplate(templateData);
export const updateWorkoutTemplate = (templateId, updates) => contentManagementService.updateWorkoutTemplate(templateId, updates);

export const getRecipesForCMS = (filters) => contentManagementService.getRecipesForCMS(filters);
export const createRecipe = (recipeData) => contentManagementService.createRecipe(recipeData);
export const updateRecipe = (recipeId, updates) => contentManagementService.updateRecipe(recipeId, updates);

export const getCategories = (type) => contentManagementService.getCategories(type);
export const createCategory = (categoryData) => contentManagementService.createCategory(categoryData);

export const getContentStats = () => contentManagementService.getContentStats();
export const searchContent = (searchTerm, contentType) => contentManagementService.searchContent(searchTerm, contentType);

export const bulkUpdateExercises = (exerciseIds, updates) => contentManagementService.bulkUpdateExercises(exerciseIds, updates);
export const bulkDeleteExercises = (exerciseIds) => contentManagementService.bulkDeleteExercises(exerciseIds);

export default contentManagementService;
