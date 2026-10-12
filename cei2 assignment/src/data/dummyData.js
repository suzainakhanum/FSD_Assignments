// Dummy Data for Instagram Clone (Frontend Only)
// All data is local and structured cleanly for beginner-friendly React learning.

import suzuAvatar from '../assets/suzu.jpeg';

export const currentUser = {
  id: 'current_user_1',
  username: 'szaina khanum',
  fullName: 'Suzaina khanum',
  avatar: suzuAvatar,
  bio: '💻 Software Engineer & UI enthusiast\n🚀 Sharing code snippets, tech aesthetics, and developer life\n☕ Driven by coffee & clean CSS\n📍 San Francisco, CA',
  website: 'https://github.com/suzainakhanum',
  postsCount: 9,
  followersCount: 1420,
  followingCount: 385,
  isVerified: true
};

export const stories = [
  {
    id: 'story_0',
    username: 'Your story',
    userAvatar: currentUser.avatar,
    isUserStory: true,
    hasUnseen: false,
    storyImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
    timestamp: 'Just now'
  },
  {
    id: 'story_1',
    username: 'alex_dev',
    userAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    isUserStory: false,
    hasUnseen: true,
    storyImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
    timestamp: '2h ago'
  },
  {
    id: 'story_2',
    username: 'elena_design',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    isUserStory: false,
    hasUnseen: true,
    storyImage: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&auto=format&fit=crop&q=80',
    timestamp: '3h ago'
  },
  {
    id: 'story_3',
    username: 'marco_shoots',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    isUserStory: false,
    hasUnseen: true,
    storyImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&auto=format&fit=crop&q=80',
    timestamp: '4h ago'
  },
  {
    id: 'story_4',
    username: 'sophia_travels',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    isUserStory: false,
    hasUnseen: true,
    storyImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
    timestamp: '6h ago'
  },
  {
    id: 'story_5',
    username: 'tech_cruncher',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    isUserStory: false,
    hasUnseen: false,
    storyImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80',
    timestamp: '8h ago'
  },
  {
    id: 'story_6',
    username: 'coffee_coder',
    userAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    isUserStory: false,
    hasUnseen: false,
    storyImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop&q=80',
    timestamp: '12h ago'
  }
];

export const posts = [
  {
    id: 'post_1',
    userId: 'user_2',
    username: 'alex_dev',
    userAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    isVerified: true,
    location: 'Silicon Valley, California',
    postImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    caption: 'Late night coding sessions hitting differently with the mechanical keyboard clacks ⌨️⚡ Working on our new React component library. What is your go-to coding beverage?',
    likesCount: 524,
    isLiked: false,
    isSaved: false,
    timestamp: '2 HOURS AGO',
    comments: [
      { id: 'c1_1', username: 'elena_design', text: 'That setup is goals! Love the clean desk setup 💻✨', timestamp: '1h ago', isLiked: false },
      { id: 'c1_2', username: 'marco_shoots', text: 'Black coffee always, no competition ☕', timestamp: '45m ago', isLiked: true },
      { id: 'c1_3', username: 'coffee_coder', text: 'Matcha latte for the smooth focus 🍵', timestamp: '30m ago', isLiked: false }
    ]
  },
  {
    id: 'post_2',
    userId: 'user_3',
    username: 'elena_design',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    isVerified: false,
    location: 'Kyoto, Japan',
    postImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=80',
    caption: 'Lost in the magical bamboo groves of Arashiyama 🎋🍃 Nature is the greatest designer in the world. Grateful for this creative getaway.',
    likesCount: 1289,
    isLiked: false,
    isSaved: true,
    timestamp: '5 HOURS AGO',
    comments: [
      { id: 'c2_1', username: 'sophia_travels', text: 'Japan is unmatched! Hope you visit the Fushimi Inari shrine too ⛩️', timestamp: '4h ago', isLiked: false },
      { id: 'c2_2', username: 'sarah_codes', text: 'Breathtaking photo Elena! Enjoy every moment! 🌸', timestamp: '3h ago', isLiked: true }
    ]
  },
  {
    id: 'post_3',
    userId: 'user_4',
    username: 'marco_shoots',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    isVerified: true,
    location: 'Swiss Alps, Switzerland',
    postImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80',
    caption: 'First light touching the summits at 3,000 meters 🏔️ The crisp morning air reminds me why waking up at 4:30 AM is always worth the trek.',
    likesCount: 3410,
    isLiked: false,
    isSaved: false,
    timestamp: '1 DAY AGO',
    comments: [
      { id: 'c3_1', username: 'alex_dev', text: 'That lighting is unreal Marco!! 📸🔥', timestamp: '1d ago', isLiked: false },
      { id: 'c3_2', username: 'nature_wild', text: 'Pure serenity. Which lens did you take this with?', timestamp: '1d ago', isLiked: false }
    ]
  },
  {
    id: 'post_4',
    userId: 'user_5',
    username: 'sophia_travels',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    isVerified: false,
    location: 'Amalfi Coast, Italy',
    postImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&auto=format&fit=crop&q=80',
    caption: 'Pastel cliffside villages, fresh limoncellos, and endless Mediterranean blue 🍋🌊 Living out my Italian summer daydream.',
    likesCount: 892,
    isLiked: false,
    isSaved: false,
    timestamp: '2 DAYS AGO',
    comments: [
      { id: 'c4_1', username: 'elena_design', text: 'Positano looks so dreamy in your shots! 🏖️', timestamp: '2d ago', isLiked: false }
    ]
  }
];

export const suggestedUsers = [
  {
    id: 'sugg_1',
    username: 'design_daily',
    fullName: 'UI/UX Design Inspiration',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    relation: 'Followed by alex_dev + 3 more',
    isFollowing: false
  },
  {
    id: 'sugg_2',
    username: 'react_community',
    fullName: 'React Official Fans',
    avatar: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&auto=format&fit=crop&q=80',
    relation: 'New to Instagram',
    isFollowing: false
  },
  {
    id: 'sugg_3',
    username: 'coffee_and_code',
    fullName: 'Coffee & Code Life',
    avatar: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=100&auto=format&fit=crop&q=80',
    relation: 'Followed by sarah_codes',
    isFollowing: false
  },
  {
    id: 'sugg_4',
    username: 'pixel_artisan',
    fullName: 'Creative Web Designer',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80',
    relation: 'Popular near you',
    isFollowing: false
  },
  {
    id: 'sugg_5',
    username: 'cyber_sophia',
    fullName: 'Sophia Developer',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    relation: 'Suggested for you',
    isFollowing: false
  }
];

export const profilePosts = [
  {
    id: 'prof_1',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    likesCount: 420,
    commentsCount: 28,
    caption: 'Building cool interfaces with React 💻✨'
  },
  {
    id: 'prof_2',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
    likesCount: 631,
    commentsCount: 45,
    caption: 'My cozy workstation setup for deep work 🌿'
  },
  {
    id: 'prof_3',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80',
    likesCount: 312,
    commentsCount: 19,
    caption: 'Designing interactive web apps with clean code 📐'
  },
  {
    id: 'prof_4',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
    likesCount: 890,
    commentsCount: 52,
    caption: 'Weekend getaway by the ocean 🌊'
  },
  {
    id: 'prof_5',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&auto=format&fit=crop&q=80',
    likesCount: 540,
    commentsCount: 33,
    caption: 'Starlit skies and mountain silhouettes 🌌'
  },
  {
    id: 'prof_6',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&auto=format&fit=crop&q=80',
    likesCount: 775,
    commentsCount: 64,
    caption: 'Art gallery inspiration for UI color palettes 🎨'
  },
  {
    id: 'prof_7',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop&q=80',
    likesCount: 489,
    commentsCount: 22,
    caption: 'Essential fuel for morning programming ☕'
  },
  {
    id: 'prof_8',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
    likesCount: 915,
    commentsCount: 71,
    caption: 'Hiking through emerald alpine valleys 🌲'
  },
  {
    id: 'prof_9',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80',
    likesCount: 1120,
    commentsCount: 88,
    caption: 'Summit reflections at sunrise ⛰️☀️'
  }
];

export const storyHighlights = [
  { id: 'h1', title: 'Coding 💻', cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=150&auto=format&fit=crop&q=80' },
  { id: 'h2', title: 'Travel ✈️', cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=150&auto=format&fit=crop&q=80' },
  { id: 'h3', title: 'Coffee ☕', cover: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=150&auto=format&fit=crop&q=80' },
  { id: 'h4', title: 'Design 🎨', cover: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=150&auto=format&fit=crop&q=80' }
];

// ─── ALL USERS (used in Search page) ───────────────────────────────────────
export const allUsers = [
  {
    id: 'user_2',
    username: 'alex_dev',
    fullName: 'Alex Developer',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    bio: '🚀 Building the web one commit at a time | React & Node lover',
    followersCount: 2340,
    followingCount: 180,
    isFollowing: false,
    isVerified: true
  },
  {
    id: 'user_3',
    username: 'elena_design',
    fullName: 'Elena Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    bio: '🎨 UI/UX Designer | Creating beauty in every pixel',
    followersCount: 5670,
    followingCount: 420,
    isFollowing: false,
    isVerified: false
  },
  {
    id: 'user_4',
    username: 'marco_shoots',
    fullName: 'Marco Ferretti',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bio: '📸 Landscape & travel photographer | Swiss Alps based',
    followersCount: 18900,
    followingCount: 290,
    isFollowing: false,
    isVerified: true
  },
  {
    id: 'user_5',
    username: 'sophia_travels',
    fullName: 'Sophia Malik',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    bio: '✈️ Travel blogger | 42 countries & counting',
    followersCount: 9100,
    followingCount: 510,
    isFollowing: false,
    isVerified: false
  },
  {
    id: 'user_6',
    username: 'tech_cruncher',
    fullName: 'Tech Cruncher',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    bio: '💡 Tech news, reviews & tutorials every day',
    followersCount: 34000,
    followingCount: 220,
    isFollowing: false,
    isVerified: true
  },
  {
    id: 'user_7',
    username: 'coffee_coder',
    fullName: 'Chris Murphy',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    bio: '☕ Coffee addict | Full-stack dev | Open source contributor',
    followersCount: 1250,
    followingCount: 340,
    isFollowing: false,
    isVerified: false
  }
];

// ─── REELS (used in Reels page) ─────────────────────────────────────────────
export const reels = [
  {
    id: 'reel_1',
    username: 'marco_shoots',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80',
    caption: 'Golden hour in the Swiss Alps 🌄 Nature never disappoints',
    likesCount: 12400,
    commentsCount: 234,
    isLiked: false,
    isSaved: false,
    duration: '0:28',
    audio: 'Original audio • marco_shoots'
  },
  {
    id: 'reel_2',
    username: 'elena_design',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&auto=format&fit=crop&q=80',
    caption: 'Color palette inspiration from this beautiful museum 🎨✨',
    likesCount: 8750,
    commentsCount: 189,
    isLiked: false,
    isSaved: false,
    duration: '0:15',
    audio: 'Lo-fi beats • trending'
  },
  {
    id: 'reel_3',
    username: 'sophia_travels',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&auto=format&fit=crop&q=80',
    caption: 'Amalfi coast sunrise — most beautiful thing I have ever seen 🌅',
    likesCount: 21300,
    commentsCount: 412,
    isLiked: false,
    isSaved: false,
    duration: '0:32',
    audio: 'Bella Ciao (Remix) • trending'
  },
  {
    id: 'reel_4',
    username: 'alex_dev',
    userAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    caption: 'My entire React setup in 30 seconds ⚡ What do you think?',
    likesCount: 6200,
    commentsCount: 310,
    isLiked: false,
    isSaved: false,
    duration: '0:30',
    audio: 'Synthwave Mix • trending'
  },
  {
    id: 'reel_5',
    username: 'coffee_coder',
    userAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop&q=80',
    caption: 'The perfect morning coding ritual ☕💻 Try it for 30 days',
    likesCount: 4900,
    commentsCount: 178,
    isLiked: false,
    isSaved: false,
    duration: '0:22',
    audio: 'Morning Vibes • coffee_coder'
  },
  {
    id: 'reel_6',
    username: 'marco_shoots',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&auto=format&fit=crop&q=80',
    caption: 'Milky Way timelapse from 3000m altitude 🌌 100 hours of shooting',
    likesCount: 45600,
    commentsCount: 890,
    isLiked: false,
    isSaved: false,
    duration: '0:45',
    audio: 'Space Ambient • trending'
  }
];

// ─── MESSAGES / CONVERSATIONS (used in Messages page) ───────────────────────
export const conversations = [
  {
    id: 'conv_1',
    user: {
      id: 'user_2',
      username: 'alex_dev',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      isOnline: true
    },
    lastMessage: 'Bro that new hook pattern is 🔥🔥',
    lastTime: '2m ago',
    unreadCount: 2,
    messages: [
      { id: 'm1_1', sender: 'alex_dev', text: 'Hey! Did you check the new React 19 features?', time: '9:00 AM' },
      { id: 'm1_2', sender: 'me', text: 'Yes! The new compiler changes are crazy good', time: '9:02 AM' },
      { id: 'm1_3', sender: 'alex_dev', text: 'The auto-memoization is going to save so many hours', time: '9:05 AM' },
      { id: 'm1_4', sender: 'me', text: 'Absolutely! No more manual useMemo everywhere 😅', time: '9:06 AM' },
      { id: 'm1_5', sender: 'alex_dev', text: 'Bro that new hook pattern is 🔥🔥', time: '9:10 AM' }
    ]
  },
  {
    id: 'conv_2',
    user: {
      id: 'user_3',
      username: 'elena_design',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      isOnline: false
    },
    lastMessage: 'Loved your latest post! 🌸',
    lastTime: '1h ago',
    unreadCount: 0,
    messages: [
      { id: 'm2_1', sender: 'elena_design', text: 'Your CSS skills are on another level! 🎨', time: '8:00 AM' },
      { id: 'm2_2', sender: 'me', text: 'Thank you Elena! I learned from your tutorials actually 😊', time: '8:05 AM' },
      { id: 'm2_3', sender: 'elena_design', text: 'Loved your latest post! 🌸', time: '8:30 AM' }
    ]
  },
  {
    id: 'conv_3',
    user: {
      id: 'user_4',
      username: 'marco_shoots',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      isOnline: true
    },
    lastMessage: 'Let\'s collab on a tech-nature series 📸',
    lastTime: '3h ago',
    unreadCount: 1,
    messages: [
      { id: 'm3_1', sender: 'marco_shoots', text: 'Your photography edits are really clean!', time: '6:00 AM' },
      { id: 'm3_2', sender: 'me', text: 'I use Lightroom + a custom preset, happy to share!', time: '6:15 AM' },
      { id: 'm3_3', sender: 'marco_shoots', text: 'Let\'s collab on a tech-nature series 📸', time: '7:00 AM' }
    ]
  },
  {
    id: 'conv_4',
    user: {
      id: 'user_5',
      username: 'sophia_travels',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      isOnline: false
    },
    lastMessage: 'Italy was absolutely magical ✨',
    lastTime: '1d ago',
    unreadCount: 0,
    messages: [
      { id: 'm4_1', sender: 'sophia_travels', text: 'Just got back from the Amalfi coast!', time: 'Yesterday' },
      { id: 'm4_2', sender: 'me', text: 'Oh wow! How was it?! 😍', time: 'Yesterday' },
      { id: 'm4_3', sender: 'sophia_travels', text: 'Italy was absolutely magical ✨', time: 'Yesterday' }
    ]
  }
];

// ─── NOTIFICATIONS (used in Notifications page) ──────────────────────────────
export const notifications = [
  {
    id: 'notif_1',
    type: 'like',
    user: {
      username: 'alex_dev',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
    },
    action: 'liked your photo.',
    postThumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=80&auto=format&fit=crop&q=80',
    time: '2 minutes ago',
    isRead: false
  },
  {
    id: 'notif_2',
    type: 'follow',
    user: {
      username: 'marco_shoots',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    action: 'started following you.',
    postThumbnail: null,
    time: '15 minutes ago',
    isRead: false,
    isFollowingBack: false
  },
  {
    id: 'notif_3',
    type: 'comment',
    user: {
      username: 'elena_design',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
    },
    action: 'commented: "Amazing shot! 🔥"',
    postThumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=80&auto=format&fit=crop&q=80',
    time: '1 hour ago',
    isRead: false
  },
  {
    id: 'notif_4',
    type: 'like',
    user: {
      username: 'sophia_travels',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
    },
    action: 'liked your photo.',
    postThumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=80&auto=format&fit=crop&q=80',
    time: '3 hours ago',
    isRead: true
  },
  {
    id: 'notif_5',
    type: 'follow',
    user: {
      username: 'tech_cruncher',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    },
    action: 'started following you.',
    postThumbnail: null,
    time: '5 hours ago',
    isRead: true,
    isFollowingBack: true
  },
  {
    id: 'notif_6',
    type: 'comment',
    user: {
      username: 'coffee_coder',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80'
    },
    action: 'commented: "This setup is goals! ✨"',
    postThumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=80&auto=format&fit=crop&q=80',
    time: '1 day ago',
    isRead: true
  },
  {
    id: 'notif_7',
    type: 'like',
    user: {
      username: 'alex_dev',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
    },
    action: 'liked your comment.',
    postThumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=80&auto=format&fit=crop&q=80',
    time: '2 days ago',
    isRead: true
  }
];

// ─── EXPLORE POSTS (used in Explore page — 12 varied images) ─────────────────
export const explorePosts = [
  { id: 'exp_1', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=80', username: 'alex_dev', likesCount: 524, caption: 'Late night coding ⌨️', isLarge: true },
  { id: 'exp_2', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&auto=format&fit=crop&q=80', username: 'elena_design', likesCount: 1289, caption: 'Bamboo groves 🎋', isLarge: false },
  { id: 'exp_3', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&auto=format&fit=crop&q=80', username: 'marco_shoots', likesCount: 3410, caption: 'Swiss Alps 🏔️', isLarge: false },
  { id: 'exp_4', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=500&auto=format&fit=crop&q=80', username: 'sophia_travels', likesCount: 892, caption: 'Amalfi Coast 🌊', isLarge: false },
  { id: 'exp_5', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=80', username: 'sarah_codes', likesCount: 631, caption: 'Workstation 💻', isLarge: true },
  { id: 'exp_6', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&auto=format&fit=crop&q=80', username: 'marco_shoots', likesCount: 5620, caption: 'Milky Way 🌌', isLarge: false },
  { id: 'exp_7', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80', username: 'sophia_travels', likesCount: 2100, caption: 'Tropical beach 🌴', isLarge: false },
  { id: 'exp_8', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&auto=format&fit=crop&q=80', username: 'coffee_coder', likesCount: 489, caption: 'Morning coffee ☕', isLarge: false },
  { id: 'exp_9', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=80', username: 'sophia_travels', likesCount: 915, caption: 'Alpine valley 🌲', isLarge: true },
  { id: 'exp_10', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=80', username: 'sarah_codes', likesCount: 312, caption: 'Web development 📐', isLarge: false },
  { id: 'exp_11', image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500&auto=format&fit=crop&q=80', username: 'elena_design', likesCount: 775, caption: 'Art gallery 🎨', isLarge: false },
  { id: 'exp_12', image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=500&auto=format&fit=crop&q=80', username: 'tech_cruncher', likesCount: 660, caption: 'City skyline 🌆', isLarge: false }
];

