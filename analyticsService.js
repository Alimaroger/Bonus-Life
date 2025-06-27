// 📊 Advanced Analytics Service
// Comprehensive analytics with data visualization and export capabilities

import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  startAfter,
  endBefore,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../firebase/firebase-config';

class AnalyticsService {
  constructor() {
    this.analyticsCollection = 'analytics';
    this.userActivityCollection = 'userActivity';
    this.workoutStatsCollection = 'workoutStats';
    this.nutritionStatsCollection = 'nutritionStats';
  }

  // 📈 Track User Activity
  async trackActivity(userId, activityType, data = {}) {
    try {
      const activityData = {
        userId,
        activityType, // 'login', 'workout_start', 'workout_complete', 'food_scan', 'recipe_view', etc.
        data,
        timestamp: serverTimestamp(),
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
        hour: new Date().getHours(),
        dayOfWeek: new Date().getDay(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
      };

      await addDoc(collection(db, this.userActivityCollection), activityData);
      return true;
    } catch (error) {
      console.error('Error tracking activity:', error);
      return false;
    }
  }

  // 📊 Get User Analytics Dashboard Data
  async getUserAnalytics(userId, timeRange = '30d') {
    try {
      const endDate = new Date();
      const startDate = new Date();
      
      // Calculate date range
      switch (timeRange) {
        case '7d':
          startDate.setDate(endDate.getDate() - 7);
          break;
        case '30d':
          startDate.setDate(endDate.getDate() - 30);
          break;
        case '90d':
          startDate.setDate(endDate.getDate() - 90);
          break;
        case '1y':
          startDate.setFullYear(endDate.getFullYear() - 1);
          break;
        default:
          startDate.setDate(endDate.getDate() - 30);
      }

      const startTimestamp = Timestamp.fromDate(startDate);
      const endTimestamp = Timestamp.fromDate(endDate);

      // Query user activities
      const q = query(
        collection(db, this.userActivityCollection),
        where('userId', '==', userId),
        where('timestamp', '>=', startTimestamp),
        where('timestamp', '<=', endTimestamp),
        orderBy('timestamp', 'desc')
      );

      const snapshot = await getDocs(q);
      const activities = [];
      
      snapshot.forEach((doc) => {
        activities.push({ id: doc.id, ...doc.data() });
      });

      return this.processUserAnalytics(activities, timeRange);
    } catch (error) {
      console.error('Error fetching user analytics:', error);
      throw new Error('Failed to fetch user analytics');
    }
  }

  // 🔄 Process User Analytics Data
  processUserAnalytics(activities, timeRange) {
    const analytics = {
      totalActivities: activities.length,
      activityBreakdown: {},
      dailyActivity: {},
      hourlyActivity: Array(24).fill(0),
      weeklyActivity: Array(7).fill(0),
      streaks: {},
      insights: []
    };

    // Process activities
    activities.forEach(activity => {
      // Activity type breakdown
      analytics.activityBreakdown[activity.activityType] = 
        (analytics.activityBreakdown[activity.activityType] || 0) + 1;

      // Daily activity
      analytics.dailyActivity[activity.date] = 
        (analytics.dailyActivity[activity.date] || 0) + 1;

      // Hourly activity
      if (activity.hour !== undefined) {
        analytics.hourlyActivity[activity.hour]++;
      }

      // Weekly activity (0 = Sunday, 6 = Saturday)
      if (activity.dayOfWeek !== undefined) {
        analytics.weeklyActivity[activity.dayOfWeek]++;
      }
    });

    // Calculate streaks
    analytics.streaks = this.calculateStreaks(activities);

    // Generate insights
    analytics.insights = this.generateInsights(analytics, timeRange);

    return analytics;
  }

  // 🔥 Calculate Activity Streaks
  calculateStreaks(activities) {
    const workoutDates = new Set();
    const loginDates = new Set();

    activities.forEach(activity => {
      if (activity.activityType === 'workout_complete') {
        workoutDates.add(activity.date);
      }
      if (activity.activityType === 'login') {
        loginDates.add(activity.date);
      }
    });

    return {
      currentWorkoutStreak: this.calculateCurrentStreak(Array.from(workoutDates)),
      longestWorkoutStreak: this.calculateLongestStreak(Array.from(workoutDates)),
      currentLoginStreak: this.calculateCurrentStreak(Array.from(loginDates)),
      longestLoginStreak: this.calculateLongestStreak(Array.from(loginDates))
    };
  }

  // 📅 Calculate Current Streak
  calculateCurrentStreak(dates) {
    if (dates.length === 0) return 0;

    dates.sort((a, b) => new Date(b) - new Date(a)); // Sort descending
    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    let currentDate = today;

    for (const date of dates) {
      if (date === currentDate) {
        streak++;
        const prevDate = new Date(currentDate);
        prevDate.setDate(prevDate.getDate() - 1);
        currentDate = prevDate.toISOString().split('T')[0];
      } else {
        break;
      }
    }

    return streak;
  }

  // 📈 Calculate Longest Streak
  calculateLongestStreak(dates) {
    if (dates.length === 0) return 0;

    dates.sort((a, b) => new Date(a) - new Date(b)); // Sort ascending
    let longestStreak = 1;
    let currentStreak = 1;

    for (let i = 1; i < dates.length; i++) {
      const prevDate = new Date(dates[i - 1]);
      const currentDate = new Date(dates[i]);
      const diffTime = currentDate - prevDate;
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      if (diffDays === 1) {
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else {
        currentStreak = 1;
      }
    }

    return longestStreak;
  }

  // 💡 Generate Insights
  generateInsights(analytics, timeRange) {
    const insights = [];

    // Most active hour
    const mostActiveHour = analytics.hourlyActivity.indexOf(Math.max(...analytics.hourlyActivity));
    insights.push({
      type: 'time',
      title: 'Peak Activity Time',
      description: `You're most active at ${mostActiveHour}:00`,
      icon: '⏰'
    });

    // Most active day
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const mostActiveDay = analytics.weeklyActivity.indexOf(Math.max(...analytics.weeklyActivity));
    insights.push({
      type: 'day',
      title: 'Most Active Day',
      description: `${dayNames[mostActiveDay]} is your most active day`,
      icon: '📅'
    });

    // Workout frequency
    const workoutCount = analytics.activityBreakdown['workout_complete'] || 0;
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const workoutFrequency = (workoutCount / days * 7).toFixed(1);
    insights.push({
      type: 'frequency',
      title: 'Workout Frequency',
      description: `${workoutFrequency} workouts per week on average`,
      icon: '💪'
    });

    // Current streak
    if (analytics.streaks.currentWorkoutStreak > 0) {
      insights.push({
        type: 'streak',
        title: 'Current Streak',
        description: `${analytics.streaks.currentWorkoutStreak} days workout streak!`,
        icon: '🔥'
      });
    }

    return insights;
  }

  // 📊 Get App-wide Analytics (Admin)
  async getAppAnalytics(timeRange = '30d') {
    try {
      const endDate = new Date();
      const startDate = new Date();
      
      switch (timeRange) {
        case '7d':
          startDate.setDate(endDate.getDate() - 7);
          break;
        case '30d':
          startDate.setDate(endDate.getDate() - 30);
          break;
        case '90d':
          startDate.setDate(endDate.getDate() - 90);
          break;
        default:
          startDate.setDate(endDate.getDate() - 30);
      }

      const startTimestamp = Timestamp.fromDate(startDate);
      const endTimestamp = Timestamp.fromDate(endDate);

      // Get all activities in time range
      const q = query(
        collection(db, this.userActivityCollection),
        where('timestamp', '>=', startTimestamp),
        where('timestamp', '<=', endTimestamp),
        orderBy('timestamp', 'desc')
      );

      const snapshot = await getDocs(q);
      const activities = [];
      
      snapshot.forEach((doc) => {
        activities.push({ id: doc.id, ...doc.data() });
      });

      return this.processAppAnalytics(activities, timeRange);
    } catch (error) {
      console.error('Error fetching app analytics:', error);
      throw new Error('Failed to fetch app analytics');
    }
  }

  // 🌐 Process App-wide Analytics
  processAppAnalytics(activities, timeRange) {
    const analytics = {
      totalUsers: new Set(activities.map(a => a.userId)).size,
      totalActivities: activities.length,
      activityBreakdown: {},
      dailyActiveUsers: {},
      popularFeatures: {},
      userEngagement: {},
      growthMetrics: {}
    };

    // Process activities
    activities.forEach(activity => {
      // Activity breakdown
      analytics.activityBreakdown[activity.activityType] = 
        (analytics.activityBreakdown[activity.activityType] || 0) + 1;

      // Daily active users
      if (!analytics.dailyActiveUsers[activity.date]) {
        analytics.dailyActiveUsers[activity.date] = new Set();
      }
      analytics.dailyActiveUsers[activity.date].add(activity.userId);

      // Popular features
      analytics.popularFeatures[activity.activityType] = 
        (analytics.popularFeatures[activity.activityType] || 0) + 1;
    });

    // Convert sets to counts
    Object.keys(analytics.dailyActiveUsers).forEach(date => {
      analytics.dailyActiveUsers[date] = analytics.dailyActiveUsers[date].size;
    });

    return analytics;
  }

  // 📤 Export User Data
  async exportUserData(userId, format = 'json') {
    try {
      // Get all user activities
      const q = query(
        collection(db, this.userActivityCollection),
        where('userId', '==', userId),
        orderBy('timestamp', 'desc')
      );

      const snapshot = await getDocs(q);
      const activities = [];
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        // Convert Firestore timestamp to readable format
        if (data.timestamp && data.timestamp.toDate) {
          data.timestamp = data.timestamp.toDate().toISOString();
        }
        activities.push({ id: doc.id, ...data });
      });

      // Format data based on requested format
      switch (format) {
        case 'csv':
          return this.convertToCSV(activities);
        case 'json':
          return JSON.stringify(activities, null, 2);
        default:
          return activities;
      }
    } catch (error) {
      console.error('Error exporting user data:', error);
      throw new Error('Failed to export user data');
    }
  }

  // 📄 Convert to CSV format
  convertToCSV(data) {
    if (data.length === 0) return '';

    const headers = Object.keys(data[0]);
    const csvHeaders = headers.join(',');
    
    const csvRows = data.map(row => {
      return headers.map(header => {
        const value = row[header];
        // Handle nested objects and arrays
        if (typeof value === 'object' && value !== null) {
          return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
        }
        return `"${String(value).replace(/"/g, '""')}"`;
      }).join(',');
    });

    return [csvHeaders, ...csvRows].join('\n');
  }

  // 📊 Get Real-time Stats
  async getRealTimeStats() {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const q = query(
        collection(db, this.userActivityCollection),
        where('date', '==', today),
        orderBy('timestamp', 'desc')
      );

      const snapshot = await getDocs(q);
      const todayActivities = [];
      
      snapshot.forEach((doc) => {
        todayActivities.push({ id: doc.id, ...doc.data() });
      });

      return {
        todayActiveUsers: new Set(todayActivities.map(a => a.userId)).size,
        todayActivities: todayActivities.length,
        lastHourActivities: todayActivities.filter(a => {
          const activityTime = a.timestamp?.toDate?.() || new Date(a.timestamp);
          const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
          return activityTime > oneHourAgo;
        }).length
      };
    } catch (error) {
      console.error('Error fetching real-time stats:', error);
      return { todayActiveUsers: 0, todayActivities: 0, lastHourActivities: 0 };
    }
  }
}

// Export singleton instance
const analyticsService = new AnalyticsService();

// Export main functions
export const trackActivity = (userId, activityType, data) => 
  analyticsService.trackActivity(userId, activityType, data);

export const getUserAnalytics = (userId, timeRange) => 
  analyticsService.getUserAnalytics(userId, timeRange);

export const getAppAnalytics = (timeRange) => 
  analyticsService.getAppAnalytics(timeRange);

export const exportUserData = (userId, format) => 
  analyticsService.exportUserData(userId, format);

export const getRealTimeStats = () => 
  analyticsService.getRealTimeStats();

export default analyticsService;
