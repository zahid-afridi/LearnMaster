CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- users
CREATE TABLE IF NOT EXISTS users(
user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
username VARCHAR(50) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
is_active BOOLEAN DEFAULT FALSE,
is_verified BOOLEAN DEFAULT FALSE,
background_image TEXT,
profile_images TEXT, 
bio VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- posts 
CREATE TABLE IF NOT EXISTS posts (
    post_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    title TEXT NOT NULL,               -- add title for homepage display
    subtitle TEXT,                     -- short description for homepage
    content TEXT NOT NULL,             -- full post content for single post page
    post_img TEXT[],                   -- multiple images
    tags TEXT[],                      -- tags ['Ai', "javascript"]
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- likes
CREATE TABLE IF NOT EXISTS likes (
  like_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  post_id UUID REFERENCES posts(post_id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (user_id, post_id)
);

-- comments
CREATE TABLE IF NOT EXISTS comments (
  comment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  post_id UUID REFERENCES posts(post_id) ON DELETE CASCADE,
  comment_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- New Tables    


-- USER FOLLOW RELATIONSHIP
-- A user can follow another user

CREATE TABLE IF NOT EXISTS user_followers(
  follower_id UUID REFERENCES users(user_id) ON DELETE CASCADE, 
  following_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (follower_id, following_id)
);


-- comments-reply
CREATE TABLE IF NOT EXISTS comment_replies(
  reply_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  post_id UUID NULL REFERENCES posts(post_id) ON DELETE CASCADE,
  comment_id UUID NOT NULL REFERENCES comments(comment_id) ON DELETE CASCADE,
  comment_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- comments-likes
CREATE TABLE IF NOT EXISTS comment_likes(
  comments_likes_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  comment_id UUID NOT NULL REFERENCES comments(comment_id) ON DELETE CASCADE,
  post_id UUID NULL REFERENCES posts(post_id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

