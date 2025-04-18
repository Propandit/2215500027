const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/social-media-analytics')
  .then(() => console.log('Connected to MongoDB for seeding'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Sample data
const users = [
  { username: 'johndoe', email: 'john@example.com', postCount: 25 },
  { username: 'janedoe', email: 'jane@example.com', postCount: 18 },
  { username: 'bobsmith', email: 'bob@example.com', postCount: 32 },
  { username: 'alicejones', email: 'alice@example.com', postCount: 15 },
  { username: 'mikebrown', email: 'mike@example.com', postCount: 28 },
  { username: 'sarahlee', email: 'sarah@example.com', postCount: 21 },
  { username: 'davidwilson', email: 'david@example.com', postCount: 10 }
];

// Seed data function
const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});

    // Create users
    const createdUsers = await User.insertMany(users);
    console.log(`${createdUsers.length} users created`);

    // Sample posts content
    const postContents = [
      'Just launched my new website! Check it out.',
      'Enjoying a beautiful day at the beach.',
      'Learning React has been an amazing journey!',
      'What do you think about the new JavaScript features?',
      'Working on a new project using the MERN stack.',
      'Who else is excited about the new tech conference?',
      'Just finished reading an amazing book on web development.',
      'Thinking about switching to TypeScript. Any thoughts?',
      'Looking for recommendations on good UX design resources.',
      'Finally solved that bug that was driving me crazy!',
      'Coffee and code, perfect morning!',
      'Just attended an amazing workshop on GraphQL.',
      'Anyone else struggling with CSS Grid?',
      'Working remotely has changed my productivity completely.'
    ];

    // Create posts
    const posts = [];
    for (let i = 0; i < 50; i++) {
      const randomUserIndex = Math.floor(Math.random() * createdUsers.length);
      const user = createdUsers[randomUserIndex];
      
      const randomContentIndex = Math.floor(Math.random() * postContents.length);
      const hasImage = Math.random() > 0.3; // 70% chance of having an image
      
      const createdAt = new Date(Date.now() - Math.floor(Math.random() * 10 * 24 * 60 * 60 * 1000)); // Random date within last 10 days
      
      posts.push({
        userId: user._id,
        username: user.username,
        content: postContents[randomContentIndex],
        hasImage,
        likeCount: Math.floor(Math.random() * 50),
        commentCount: Math.floor(Math.random() * 25),
        createdAt
      });
    }

    const createdPosts = await Post.insertMany(posts);
    console.log(`${createdPosts.length} posts created`);

    console.log('Database successfully seeded!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedData();