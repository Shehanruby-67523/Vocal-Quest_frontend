/**
 * Utility to retrieve the permanently saved profile picture across Vocal Quest.
 * Storage keys:
 * 1. vocal_quest_avatar_permanent (High priority explicit saved avatar)
 * 2. vocal_quest_user.avatar
 * 3. Fallback Dicebear SVG seed
 */

export function getUserAvatar(userData = null) {
  try {
    const permanent = localStorage.getItem('vocal_quest_avatar_permanent');
    if (permanent && permanent.trim()) {
      return permanent;
    }

    if (userData && userData.avatar) {
      return userData.avatar;
    }

    const stored = localStorage.getItem('vocal_quest_user');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && parsed.avatar) {
        return parsed.avatar;
      }
    }
  } catch (e) {
    console.warn('Failed to load saved user avatar:', e.message);
  }

  const name = userData?.name || userData?.username || 'Player';
  return `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`;
}

export function saveUserAvatar(avatarUrl) {
  if (!avatarUrl) return;

  try {
    localStorage.setItem('vocal_quest_avatar_permanent', avatarUrl);

    const stored = localStorage.getItem('vocal_quest_user');
    let userObj = {};
    if (stored) {
      try {
        userObj = JSON.parse(stored);
      } catch (e) {}
    }
    userObj.avatar = avatarUrl;
    localStorage.setItem('vocal_quest_user', JSON.stringify(userObj));

    // Notify other components/tabs of avatar update
    window.dispatchEvent(new CustomEvent('vocal_quest_avatar_changed', { detail: avatarUrl }));
  } catch (e) {
    console.warn('Failed to save user avatar:', e.message);
  }
}
